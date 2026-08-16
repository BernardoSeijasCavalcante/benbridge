"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualiIntegrationService = void 0;
const QualiApiClient_1 = require("./QualiApiClient");
class QualiIntegrationService {
    constructor() {
        this.apiClient = new QualiApiClient_1.QualiApiClient();
    }
    // Pre-requisito: Obter ruleId
    async getProductRules(operationCode) {
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
    async calculateSimulation(payload) {
        const client = this.apiClient.getClient();
        const response = await client.post('/v3/loan-inss-simulations/calculation', payload);
        return response.data;
    }
    // Passo 2: Criação da Simulação
    async createSimulation(payload) {
        const client = this.apiClient.getClient();
        const response = await client.post('/v3/loan-inss-simulations', payload);
        return response.data;
    }
    // Passo 3: Obtenção do Termo de Autorização
    async getAuthTerm(simulationId) {
        const client = this.apiClient.getClient();
        const response = await client.get(`/v3/loan-inss-simulations/${simulationId}/auth-term`);
        return response.data;
    }
    // Passo 4: Assinatura do Termo de Autorização
    async acceptAuthTerm(authTermKey, latitude, longitude) {
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
    async createContracts(simulationId) {
        const client = this.apiClient.getClient();
        const response = await client.post(`/v3/loan-inss-simulations/${simulationId}/actions`, {
            command: 'create_loans'
        });
        return response.data;
    }
    // Passo 6: Consulta de Contratos
    async querySimulationContracts(simulationId) {
        const client = this.apiClient.getClient();
        const response = await client.get(`/v3/loans/simulation/${simulationId}`);
        return response.data;
    }
    // Passo 1.5: Upload de Arquivos
    async uploadDocumentByUrl(publicUrl) {
        const client = this.apiClient.getClient();
        const uploadUrl = process.env.QUALI_UPLOAD_URL || '/v3/files/upload-by-url';
        const response = await client.post(uploadUrl, {
            url: publicUrl
        });
        return response.data;
    }
    // Consulta IN100 - Inicia a consulta
    async initiateIN100Query(identity, benefitNumber) {
        const client = this.apiClient.getClient();
        const response = await client.post('/v3/query-inss-balances/finder', {
            identity,
            benefitNumber
        });
        return response.data;
    }
    // Consulta IN100 - Verifica o status
    async checkIN100Status(queryId) {
        const client = this.apiClient.getClient();
        const response = await client.get(`/v3/query-inss-balances/${queryId}`);
        return response.data;
    }
}
exports.QualiIntegrationService = QualiIntegrationService;
