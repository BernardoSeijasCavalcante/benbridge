import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';
import { getDatabase } from '../database/sqlite';

export class IN100WorkerUseCase {
  private qualiService: QualiIntegrationService;

  constructor() {
    this.qualiService = new QualiIntegrationService();
  }

  private async logStep(db: any, internalId: number, step: string, success: boolean, data?: any) {
    await db.run(
      'INSERT INTO logs (simulation_internal_id, step, success, data) VALUES (?, ?, ?, ?)',
      [internalId, step, success ? 1 : 0, data ? JSON.stringify(data) : null]
    );
  }

  // Método que verifica todas as simulações pendentes de IN100 (Para ser chamado via Cron/Job)
  public async processPendingQueries(): Promise<any> {
    const db = await getDatabase();
    const pendingSimulations = await db.all("SELECT id FROM simulations WHERE in100_status = 'pending_authorization'");
    
    const results = [];
    for (const sim of pendingSimulations) {
      try {
        const result = await this.executeForSimulation(sim.id, db);
        results.push({ internalId: sim.id, success: true, result });
      } catch (error: any) {
        results.push({ internalId: sim.id, success: false, error: error.message });
      }
    }
    return results;
  }

  // Método principal que verifica uma simulação específica (Pode ser chamado manualmente pelo frontend)
  public async executeForSimulation(internalId: number, dbInstance?: any): Promise<any> {
    const db = dbInstance || await getDatabase();
    
    const simulation = await db.get('SELECT * FROM simulations WHERE id = ?', [internalId]);
    if (!simulation) {
      throw new Error(`Simulação com internalId ${internalId} não encontrada.`);
    }

    if (!simulation.in100_query_id) {
      throw new Error(`A simulação (internalId ${internalId}) não possui in100_query_id associado.`);
    }

    if (simulation.in100_status === 'approved' || simulation.in100_status === 'completed') {
      return { status: simulation.in100_status, message: 'Consulta IN100 já processada e aprovada.' };
    }
    if (simulation.in100_status === 'rejected') {
      return { status: 'rejected', message: 'Consulta IN100 já foi processada e rejeitada por falta de margem.' };
    }

    const queryId = simulation.in100_query_id;
    const simulationId = simulation.simulation_id;
    const executionTrace: string[] = [];

    try {
      // 1. Consultar status da IN100
      const statusResult = await this.qualiService.checkIN100Status(queryId);
      executionTrace.push('Consulta Status IN100: Retornou Payload');
      
      // O endpoint de consulta costuma retornar o payload final se aprovado, 
      // ou um status pendente. Precisamos verificar se os dados existem.
      const availableBalance = statusResult?.data?.availableTotalBalance ?? statusResult?.availableTotalBalance;

      // Se não veio o campo de saldo, inferimos que ainda está pendente
      if (availableBalance === undefined || availableBalance === null) {
        return { status: 'pending_authorization', message: 'Aguardando o cliente autorizar a consulta IN100.', data: statusResult };
      }

      await this.logStep(db, internalId, 'step_in100_check', true, statusResult);
      
      // 2. Análise de Crédito
      const saldoDisponivel = Number(availableBalance);
      executionTrace.push(`IN100 Análise: Saldo Disponível = ${saldoDisponivel}`);

      if (saldoDisponivel >= 0) {
        // Aprovado
        await db.run("UPDATE simulations SET in100_status = 'approved' WHERE id = ?", [internalId]);
        executionTrace.push('IN100 Análise: Aprovada');

        // Passo 5: Geração de Contratos
        const actionsResult = await this.qualiService.createContracts(simulationId);
        await this.logStep(db, internalId, 'step5_create_contracts', true, actionsResult);
        executionTrace.push('Passo 5 (Geração de Contratos): Sucesso');

        await db.run("UPDATE simulations SET status = 'contracts_created', in100_status = 'completed' WHERE id = ?", [internalId]);

        // Passo 6 Opcional (Consulta final)
        const finalContracts = await this.qualiService.querySimulationContracts(simulationId);
        await this.logStep(db, internalId, 'step6_query_contracts', true, finalContracts);

        await db.run('UPDATE simulations SET status = ?, response = ? WHERE id = ?', ['completed', JSON.stringify(finalContracts), internalId]);

        return {
          success: true,
          internalId,
          simulationId,
          in100: {
            status: 'completed',
            availableBalance: saldoDisponivel
          },
          contracts: finalContracts,
          executionTrace
        };

      } else {
        // Reprovado
        const reason = `Análise Reprovada: Cliente possui margem negativa (R$ ${saldoDisponivel}).`;
        await db.run("UPDATE simulations SET in100_status = 'rejected', status = 'rejected' WHERE id = ?", [internalId]);
        await this.logStep(db, internalId, 'step_in100_check_failed', false, { reason, saldoDisponivel });
        executionTrace.push(reason);

        return {
          success: false,
          internalId,
          simulationId,
          in100: {
            status: 'rejected',
            availableBalance: saldoDisponivel
          },
          message: reason,
          executionTrace
        };
      }
    } catch (error: any) {
      executionTrace.push('Falha ao checar status da IN100 ou ao executar Passo 5.');
      const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : (error.message || 'Erro desconhecido');
      await this.logStep(db, internalId, 'error_in100_worker', false, { error: errorMessage, trace: executionTrace });
      
      throw new Error(`IN100WorkerUseCase Failed: ${errorMessage}`);
    }
  }
}
