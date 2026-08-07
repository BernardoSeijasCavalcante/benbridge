"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationController = void 0;
const ProcessLoanSimulationUseCase_1 = require("../useCases/ProcessLoanSimulationUseCase");
const QualiIntegrationService_1 = require("../services/quali/QualiIntegrationService");
const sqlite_1 = require("../database/sqlite");
const qualiService = new QualiIntegrationService_1.QualiIntegrationService();
const processUseCase = new ProcessLoanSimulationUseCase_1.ProcessLoanSimulationUseCase();
class SimulationController {
    // Endpoint Único: Processo Completo
    async processFull(req, res) {
        try {
            const payload = req.body;
            const geolocation = {
                latitude: req.body.latitude || '-23.5489',
                longitude: req.body.longitude || '-46.6388'
            };
            const result = await processUseCase.execute(payload, geolocation);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message, details: error.details });
        }
    }
    // Endpoint Parcial: Passos 1 e 2 apenas
    async processCreationOnly(req, res) {
        try {
            const payload = req.body;
            const result = await processUseCase.executeUpToStep2(payload);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message, details: error.details });
        }
    }
    // Endpoints Separados (Parciais)
    async calculateSmart(req, res) {
        try {
            const payload = req.body;
            const result = await processUseCase.executeSmartCalculation(payload);
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message, details: error.details });
        }
    }
    async calculate(req, res) {
        try {
            const result = await qualiService.calculateSimulation(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    async create(req, res) {
        try {
            const result = await qualiService.createSimulation(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    async getAuthTerm(req, res) {
        try {
            const { id } = req.params;
            const result = await qualiService.getAuthTerm(id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    async acceptAuthTerm(req, res) {
        try {
            const { key } = req.params;
            const { latitude, longitude } = req.body;
            const result = await qualiService.acceptAuthTerm(key, latitude, longitude);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    async createContracts(req, res) {
        try {
            const { id } = req.params;
            const result = await qualiService.createContracts(id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    async queryContracts(req, res) {
        try {
            const { id } = req.params;
            const result = await qualiService.querySimulationContracts(id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    // Apenas para verificar o estado no BD SQLite local
    async getLocalStatus(req, res) {
        try {
            const { internalId } = req.params;
            const db = await (0, sqlite_1.getDatabase)();
            const sim = await db.get('SELECT * FROM simulations WHERE id = ?', [internalId]);
            const logs = await db.all('SELECT * FROM logs WHERE simulation_internal_id = ? ORDER BY id ASC', [internalId]);
            res.status(200).json({ simulation: sim, logs });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.SimulationController = SimulationController;
