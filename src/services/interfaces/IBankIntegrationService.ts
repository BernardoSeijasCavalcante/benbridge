export interface IBankIntegrationService {
  getProductRules(operationCode: number): Promise<any>;
  calculateSimulation(payload: any): Promise<any>;
  createSimulation(payload: any): Promise<any>;
  getAuthTerm(simulationId: string): Promise<any>;
  acceptAuthTerm(authTermKey: string, latitude: string, longitude: string): Promise<any>;
  createContracts(simulationId: string): Promise<any>;
  querySimulationContracts(simulationId: string): Promise<any>;
  uploadDocumentByUrl(publicUrl: string): Promise<any>;
  initiateIN100Query(identity: string, benefitNumber: string): Promise<any>;
  checkIN100Status(queryId: string): Promise<any>;
}
