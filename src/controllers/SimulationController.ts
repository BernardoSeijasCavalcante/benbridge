import { Request, Response } from 'express';
import { ProcessLoanSimulationUseCase } from '../useCases/ProcessLoanSimulationUseCase';
import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';
import { getDatabase } from '../database/sqlite';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const qualiService = new QualiIntegrationService();
const processUseCase = new ProcessLoanSimulationUseCase();

export class SimulationController {
  
  // Endpoint Único: Processo Completo
  public async processFull(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const geolocation = {
        latitude: req.body.latitude || '-23.5489',
        longitude: req.body.longitude || '-46.6388'
      };

      const result = await processUseCase.execute(payload, geolocation);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, details: error.details });
    }
  }

  // Endpoint Parcial: Passos 1 e 2 apenas
  public async processCreationOnly(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const result = await processUseCase.executeUpToStep2(payload);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, details: error.details });
    }
  }

  // Endpoints Separados (Parciais)
  public async calculateSmart(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const result = await processUseCase.executeSmartCalculation(payload);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, details: error.details });
    }
  }

  public async calculate(req: Request, res: Response): Promise<void> {
    try {
      const items = req.body.items || [];
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Nenhum item (contrato) enviado. A propriedade "items" é obrigatória e deve ser um array.');
      }
      
      const results = [];
      for (let i = 0; i < items.length; i++) {
        if (i > 0) {
          console.log('Aguardando 3000ms para evitar rate limit na JoinBank...');
          await delay(3000);
        }
        const calcResult = await qualiService.calculateSimulation(items[i]);
        results.push(calcResult);
      }
      
      res.status(200).json({ success: true, data: results });
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await qualiService.createSimulation(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  public async getAuthTerm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await qualiService.getAuthTerm(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  public async acceptAuthTerm(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;
      const { latitude, longitude } = req.body;
      const result = await qualiService.acceptAuthTerm(key, latitude, longitude);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  public async createContracts(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await qualiService.createContracts(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  public async queryContracts(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await qualiService.querySimulationContracts(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  // Apenas para verificar o estado no BD SQLite local
  public async getLocalStatus(req: Request, res: Response): Promise<void> {
    try {
      const { internalId } = req.params;
      const db = await getDatabase();
      const sim = await db.get('SELECT * FROM simulations WHERE id = ?', [internalId]);
      const logs = await db.all('SELECT * FROM logs WHERE simulation_internal_id = ? ORDER BY id ASC', [internalId]);
      res.status(200).json({ simulation: sim, logs });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
