import { QualiApiClient } from './QualiApiClient';

export class QualiIntegrationService {
  private apiClient: QualiApiClient;

  constructor() {
    this.apiClient = new QualiApiClient();
  }

  // Pre-requisito: Obter ruleId
  public async getProductRules(operationCode: number): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.post('/v3/loan-product-rules/search/basic', {
      operation: {
        code: {
          eq: operationCode
        }
      }
    });
    return response.data;
  }

  // Passo 1: Cálculo Prévio da Simulação
  public async calculateSimulation(payload: any): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.post('/v3/loan-inss-simulations/calculation', payload);
    return response.data;
  }

  // Passo 2: Criação da Simulação
  public async createSimulation(payload: any): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.post('/v3/loan-inss-simulations', payload);
    return response.data;
  }

  // Passo 3: Obtenção do Termo de Autorização
  public async getAuthTerm(simulationId: string): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.get(`/v3/loan-inss-simulations/${simulationId}/auth-term`);
    return response.data;
  }

  // Passo 4: Assinatura do Termo de Autorização
  public async acceptAuthTerm(authTermKey: string, latitude: string, longitude: string): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.put(`/v3/signer/${authTermKey}/accept`, {
      position: {
        latitude,
        longitude
      }
    });
    return response.data;
  }

  // Passo 5: Geração dos Contratos
  public async createContracts(simulationId: string): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.post(`/v3/loan-inss-simulations/${simulationId}/actions`, {
      command: 'create_loans'
    });
    return response.data;
  }

  // Passo 6: Consulta de Contratos
  public async querySimulationContracts(simulationId: string): Promise<any> {
    const client = this.apiClient.getClient();
    const response = await client.get(`/v3/loans/simulation/${simulationId}`);
    return response.data;
  }

  // Passo 1.5: Upload de Arquivos
  public async uploadDocumentByUrl(publicUrl: string): Promise<any> {
    const client = this.apiClient.getClient();
    const uploadUrl = process.env.QUALI_UPLOAD_URL || '/v3/files/upload-by-url';
    const response = await client.post(uploadUrl, {
      url: publicUrl
    });
    return response.data;
  }
}
