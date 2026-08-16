import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';
import { getDatabase } from '../database/sqlite';

export class ProcessContinuationUseCase {
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

  public async execute(internalId: number, identity: string, benefitNumber: string, geolocation: { latitude: string; longitude: string }): Promise<any> {
    const db = await getDatabase();

    const simulation = await db.get('SELECT * FROM simulations WHERE id = ?', [internalId]);
    if (!simulation) {
      throw new Error(`Simulação com internalId ${internalId} não encontrada.`);
    }

    if (!simulation.simulation_id) {
      throw new Error(`A simulação (internalId ${internalId}) não possui um simulation_id da Quali.`);
    }

    const simulationId = simulation.simulation_id;
    const executionTrace: string[] = [];

    try {
      // Passo 3: Obter Termo de Autorização
      const authTerm = await this.qualiService.getAuthTerm(simulationId);
      await this.logStep(db, internalId, 'step3_get_auth_term', true, authTerm);
      executionTrace.push('Passo 3 (Termo de Autorização): Sucesso');

      const termStatus = authTerm?.data?.status?.key || authTerm?.status?.key;
      const termKey = authTerm?.data?.key || authTerm?.key;

      if (!termKey) {
        throw new Error('Chave do termo (key) não encontrada na resposta do Passo 3.');
      }

      // Passo 4: Assinar Termo (se necessário)
      if (termStatus !== 'signed') {
        const acceptResult = await this.qualiService.acceptAuthTerm(termKey, geolocation.latitude, geolocation.longitude);
        await this.logStep(db, internalId, 'step4_accept_auth_term', true, acceptResult);
        executionTrace.push('Passo 4 (Assinatura do Termo): Sucesso');
      } else {
        await this.logStep(db, internalId, 'step4_accept_auth_term', true, { skipped: true, reason: 'Already signed' });
        executionTrace.push('Passo 4 (Assinatura do Termo): Ignorado (Já Assinado)');
      }

      await db.run('UPDATE simulations SET status = ? WHERE id = ?', ['auth_term_signed', internalId]);

      // IN100: Iniciar a consulta
      const in100Result = await this.qualiService.initiateIN100Query(identity, benefitNumber);
      await this.logStep(db, internalId, 'step_in100_initiate', true, in100Result);
      executionTrace.push('IN100 (Início da Consulta): Sucesso');

      // Assume que o payload devolve as URLs conforme documentação do governo/banco.
      // A estrutura exata do JSON não está no MD (apenas "Isole a URL de autorização devolvida... e Capture o identificador (UUID)").
      const queryId = in100Result?.data?.id || in100Result?.id || in100Result?.query_inss_balance_id;
      const authUrl = in100Result?.data?.authorizationUrl || in100Result?.data?.link || in100Result?.authorizationUrl || in100Result?.link;

      if (!queryId) {
        throw new Error('Identificador da consulta IN100 não retornado.');
      }

      await db.run(
        'UPDATE simulations SET in100_query_id = ?, in100_auth_url = ?, in100_status = ? WHERE id = ?',
        [queryId, authUrl || null, 'pending_authorization', internalId]
      );

      return {
        success: true,
        internalId,
        simulationId,
        in100: {
          queryId,
          authUrl,
          status: 'pending_authorization'
        },
        executionTrace,
        message: 'Passos 3, 4 e iniciação da IN100 concluídos. Aguardando autorização do cliente.'
      };

    } catch (error: any) {
      executionTrace.push('Falha na execução dos passos da continuação.');
      const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : (error.message || 'Erro desconhecido');
      await this.logStep(db, internalId, 'error_continuation', false, { error: errorMessage, trace: executionTrace });
      await db.run('UPDATE simulations SET error_message = ? WHERE id = ?', [errorMessage, internalId]);

      // eslint-disable-next-line no-throw-literal
      throw { message: `ProcessContinuationUseCase Failed: ${errorMessage}`, details: executionTrace };
    }
  }
}
