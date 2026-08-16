"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinantoIntegrationService = void 0;
class FinantoIntegrationService {
    async getProductRules(operationCode) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async calculateSimulation(payload) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async createSimulation(payload) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async getAuthTerm(simulationId) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async acceptAuthTerm(authTermKey, latitude, longitude) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async createContracts(simulationId) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async querySimulationContracts(simulationId) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async uploadDocumentByUrl(publicUrl) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async initiateIN100Query(identity, benefitNumber) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
    async checkIN100Status(queryId) {
        throw new Error('Integração com o banco Finanto ainda não implementada.');
    }
}
exports.FinantoIntegrationService = FinantoIntegrationService;
