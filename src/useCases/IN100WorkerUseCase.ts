import { BankIntegrationFactory } from '../services/BankIntegrationFactory';
import { IBankIntegrationService } from '../services/interfaces/IBankIntegrationService';
import { ProcessLoanSimulationUseCase } from './ProcessLoanSimulationUseCase';
import { getDatabase } from '../database/sqlite';

export class IN100WorkerUseCase {
  private processLoanUseCase: ProcessLoanSimulationUseCase;

  constructor() {
    this.processLoanUseCase = new ProcessLoanSimulationUseCase();
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
  public async executeForSimulation(internalId: number, dbInstance?: any, latitude?: string, longitude?: string, borrowerDataOverrides?: any): Promise<any> {
    const db = dbInstance || await getDatabase();
    
    const simulation = await db.get('SELECT * FROM simulations WHERE id = ?', [internalId]);
    if (!simulation) {
      throw new Error(`Simulação com internalId ${internalId} não encontrada.`);
    }

    if (!simulation.in100_query_id) {
      throw new Error(`A simulação (internalId ${internalId}) não possui in100_query_id associado.`);
    }

    if (simulation.in100_status === 'completed') {
      return { status: simulation.in100_status, message: 'Consulta IN100 e Formalização já concluídas com sucesso.' };
    }
    if (simulation.in100_status === 'rejected') {
      return { status: 'rejected', message: 'Consulta IN100 já foi processada e rejeitada por falta de margem.' };
    }

    const queryId = simulation.in100_query_id;
    const simulationId = simulation.simulation_id;
    const executionTrace: string[] = [];

    try {
      const simulationPayload = JSON.parse(simulation.payload || '{}');

      // Aplica os overrides enviados pelo usuário, caso existam dados faltantes vitais do Datahub
      if (borrowerDataOverrides && simulationPayload.borrowerData) {
        if (borrowerDataOverrides.name) {
          simulationPayload.borrowerData.borrower.name = borrowerDataOverrides.name;
        }
        if (borrowerDataOverrides.birthDate) {
          simulationPayload.borrowerData.borrower.birthDate = borrowerDataOverrides.birthDate;
        }
        if (borrowerDataOverrides.motherName) {
          simulationPayload.borrowerData.borrower.motherName = borrowerDataOverrides.motherName;
        }
        if (borrowerDataOverrides.identity) {
          simulationPayload.borrowerData.borrower.identity = borrowerDataOverrides.identity;
        }
        if (borrowerDataOverrides.document?.number) {
          simulationPayload.borrowerData.borrower.document.number = borrowerDataOverrides.document.number;
        }
        if (borrowerDataOverrides.address) {
          simulationPayload.borrowerData.borrower.address = {
            ...simulationPayload.borrowerData.borrower.address,
            ...borrowerDataOverrides.address
          };
        }
        if (borrowerDataOverrides.benefit) {
          simulationPayload.borrowerData.borrower.benefit = borrowerDataOverrides.benefit;
        }
        if (borrowerDataOverrides.benefitType) {
          simulationPayload.borrowerData.borrower.benefitType = borrowerDataOverrides.benefitType;
        }
        if (borrowerDataOverrides.income) {
          simulationPayload.borrowerData.borrower.income = borrowerDataOverrides.income;
        }
        if (borrowerDataOverrides.creditBankAccount) {
          simulationPayload.borrowerData.creditBankAccount = {
            ...simulationPayload.borrowerData.creditBankAccount,
            ...borrowerDataOverrides.creditBankAccount
          };
        }
        
        await db.run('UPDATE simulations SET payload = ? WHERE id = ?', [JSON.stringify(simulationPayload), internalId]);
        executionTrace.push('Dados da simulação atualizados com os overrides fornecidos pelo cliente.');
      }

      const bankName = simulationPayload.bank || 'qualibank';
      const bankService = BankIntegrationFactory.getService(bankName);

      let saldoDisponivel = 0;
      let isAlreadyApproved = simulation.in100_status === 'approved';

      if (!isAlreadyApproved) {
        // 1. Consultar status da IN100 apenas se ainda não aprovado
        const statusResult = await bankService.checkIN100Status(queryId);
        executionTrace.push('Consulta Status IN100: Retornou Payload');
        
        // O endpoint de consulta costuma retornar o payload final se aprovado, 
        // ou um status pendente. Precisamos verificar se os dados existem.
        const availableBalance = statusResult?.data?.availableTotalBalance ?? statusResult?.availableTotalBalance;

        // Se não veio o campo de saldo, inferimos que ainda está pendente
        if (availableBalance === undefined || availableBalance === null) {
          return { status: 'pending_authorization', message: 'Aguardando o cliente autorizar a consulta IN100.', data: statusResult };
        }

        await this.logStep(db, internalId, 'step_in100_check', true, statusResult);
        
        saldoDisponivel = Number(availableBalance);
        executionTrace.push(`IN100 Análise: Saldo Disponível = ${saldoDisponivel}`);

        if (saldoDisponivel < 0) {
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

        // Se passou, atualiza para aprovado no banco antes de rodar os passos
        await db.run("UPDATE simulations SET in100_status = 'approved' WHERE id = ?", [internalId]);
        executionTrace.push('IN100 Análise: Aprovada');
      } else {
        executionTrace.push('IN100 Análise: Já estava aprovada anteriormente. Retomando fluxo.');
      }

      // 2. Análise de Crédito e Formalização (Passos 1 a 5)
      const lat = latitude || '-23.5489';
      const lon = longitude || '-46.6388';
      const geolocation = { latitude: lat, longitude: lon };

      const processResult = await this.processLoanUseCase.executeFromExistingId(internalId, geolocation, db);
      
      await db.run("UPDATE simulations SET in100_status = 'completed' WHERE id = ?", [internalId]);

      let formalizationUrl = null;
      if (processResult?.contracts && Array.isArray(processResult.contracts)) {
        const contractWithUrl = processResult.contracts.find((c: any) => c?.signature?.url);
        if (contractWithUrl) {
          formalizationUrl = contractWithUrl.signature.url;
        }
      }

      return {
        success: true,
        url: formalizationUrl,
        internalId,
        in100: {
          status: 'completed',
          availableBalance: saldoDisponivel
        },
        processResult,
        executionTrace: [...executionTrace, 'Delegado para ProcessLoanSimulationUseCase']
      };
    } catch (error: any) {
      executionTrace.push('Falha ao checar status da IN100 ou ao executar os Passos (1 a 5).');
      const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : (error.message || 'Erro desconhecido');
      
      let details = error.details;
      if (!details) {
        details = { trace: executionTrace };
      } else {
        if (details.trace) {
          details.trace = [...executionTrace, ...details.trace];
        } else {
          details.trace = executionTrace;
        }
      }
      
      await this.logStep(db, internalId, 'error_in100_worker', false, { error: errorMessage, details });
      
      // eslint-disable-next-line no-throw-literal
      throw { message: `IN100WorkerUseCase Failed: ${errorMessage}`, details };
    }
  }
}
