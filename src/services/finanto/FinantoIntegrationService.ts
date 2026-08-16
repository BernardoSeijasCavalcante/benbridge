import { IBankIntegrationService } from '../interfaces/IBankIntegrationService';

export class FinantoIntegrationService implements IBankIntegrationService {
  public async getProductRules(operationCode: number): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async calculateSimulation(payload: any): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async createSimulation(payload: any): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async getAuthTerm(simulationId: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async acceptAuthTerm(authTermKey: string, latitude: string, longitude: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async createContracts(simulationId: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async querySimulationContracts(simulationId: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async uploadDocumentByUrl(publicUrl: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async initiateIN100Query(identity: string, benefitNumber: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }

  public async checkIN100Status(queryId: string): Promise<any> {
    throw new Error('Integração com o banco Finanto ainda não implementada.');
  }
}
