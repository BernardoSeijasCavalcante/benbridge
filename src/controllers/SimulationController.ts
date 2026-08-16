import { Request, Response } from 'express';
import axios from 'axios';
import { ProcessLoanSimulationUseCase } from '../useCases/ProcessLoanSimulationUseCase';
import { ProcessContinuationUseCase } from '../useCases/ProcessContinuationUseCase';
import { IN100WorkerUseCase } from '../useCases/IN100WorkerUseCase';
import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';
import { getDatabase } from '../database/sqlite';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const qualiService = new QualiIntegrationService();
const processUseCase = new ProcessLoanSimulationUseCase();
const processContinuationUseCase = new ProcessContinuationUseCase();
const in100WorkerUseCase = new IN100WorkerUseCase();

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

  // Novo Endpoint: Smart Creation (Datahub + Passos 1 e 2)
  public async processSmartCreation(req: Request, res: Response): Promise<void> {
    try {
      const { beneficio, items, files, validate, operationCode } = req.body;
      const datahubApiKey = process.env.DATAHUB_API_KEY;

      if (!datahubApiKey) {
        throw new Error('Chave de API do Datahub não configurada no servidor (DATAHUB_API_KEY).');
      }

      if (!beneficio) {
        throw new Error('Parâmetro obrigatório ausente: beneficio.');
      }

      // Buscar dados no Datahub
      const datahubClient = axios.create({
        baseURL: 'https://api.bancodatahub.com',
        headers: {
          Authorization: datahubApiKey
        }
      });

      const datahubRes = await datahubClient.post('/offline', { beneficio });
      const offlineData = datahubRes.data;

      if (!offlineData || !offlineData.Beneficiario) {
        throw new Error('Não foi possível recuperar os dados do Beneficiário através do Datahub.');
      }

      // Formatadores e Defaults
      const parseAddress = (endereco: string) => {
        if (!endereco) return { street: 'NÃO INFORMADO', number: 'SN' };
        const match = endereco.match(/(.+?)\s+(\d+)$/);
        if (match) {
          return { street: match[1].trim(), number: match[2] };
        }
        return { street: endereco.trim(), number: 'SN' };
      };

      const getEmailFromName = (nome: string) => {
        if (!nome) return 'nome.sobrenome@gmail.com';
        const parts = nome.trim().toLowerCase().split(' ').filter(p => p.length > 0);
        if (parts.length >= 2) {
          return `${parts[0]}.${parts[parts.length - 1]}@gmail.com`;
        }
        return `${parts[0]}@gmail.com`;
      };

      const extractDigit = (conta: string) => {
        if (!conta) return { number: '', digit: '0' };
        const match = conta.match(/^(.+)[-\s](\d)$/);
        if (match) {
          return { number: match[1], digit: match[2] };
        }
        if (conta.length > 1) {
          return { 
            number: conta.slice(0, -1), 
            digit: conta.slice(-1) 
          };
        }
        return { number: conta, digit: '0' };
      };

      const addr = parseAddress(offlineData.Beneficiario.Endereco);
      const email = getEmailFromName(offlineData.Beneficiario.Nome);
      const conta = extractDigit(offlineData.DadosBancarios?.ContaPagto);

      // Mapear dados para o payload da Quali
      const borrowerData = {
        borrower: {
          name: offlineData.Beneficiario.Nome,
          identity: offlineData.Beneficiario.CPF,
          benefit: offlineData.Beneficiario.Beneficio,
          benefitState: offlineData.Beneficiario.UFBeneficio || offlineData.Beneficiario.UF,
          benefitStartDate: offlineData.Beneficiario.DIB,
          benefitPaymentMethod: offlineData.DadosBancarios?.MeioPagamento === "2" ? 2 : 1,
          benefitType: offlineData.Beneficiario.Especie ? parseInt(offlineData.Beneficiario.Especie, 10) : 42,
          birthDate: offlineData.Beneficiario.DataNascimento,
          motherName: offlineData.Beneficiario.NomeMae,
          maritalStatus: 'Solteiro', // Regra: Sempre solteiro
          sex: offlineData.Beneficiario.Sexo === 'M' ? 'Masculino' : 'Feminino',
          income: offlineData.ResumoFinanceiro?.ValorBeneficio || 0,
          phone: offlineData.Telefone && offlineData.Telefone.length > 0 ? offlineData.Telefone[0] : '',
          email: email,
          address: {
            street: addr.street,
            number: addr.number,
            complement: '',
            district: offlineData.Beneficiario.Bairro || '',
            city: offlineData.Beneficiario.Cidade || '',
            state: offlineData.Beneficiario.UF || '',
            zipCode: offlineData.Beneficiario.CEP || ''
          },
          document: {
            type: { code: 'RG', name: 'Registro Geral' },
            number: offlineData.Beneficiario.Rg,
            issuingDate: '2022-10-10', // Regra definida
            issuingEntity: 'SSP', // Regra definida
            issuingState: offlineData.Beneficiario.UF
          }
        },
        creditBankAccount: {
          bank: offlineData.DadosBancarios?.Banco?.toString().padStart(3, '0') || '000',
          branch: offlineData.DadosBancarios?.Agencia?.toString() || '0000',
          number: conta.number,
          digit: conta.digit
        }
      };

      const processPayload = {
        borrowerData,
        items: items || [],
        files: files || [],
        validate,
        operationCode: operationCode || 4
      };

      const result = await processUseCase.executeUpToStep2(processPayload);

      res.status(200).json({
        success: true,
        internalId: result.internalId,
        identity: borrowerData.borrower.identity,
        benefitNumber: borrowerData.borrower.benefit
      });
    } catch (error: any) {
      const statusCode = error.response?.status || 500;
      const responseData = error.response?.data;
      res.status(statusCode).json({
        success: false,
        message: error.message,
        details: responseData || error.details
      });
    }
  }

  // Novo Endpoint: Continuação (Passos 3, 4 e IN100)
  public async processContinuation(req: Request, res: Response): Promise<void> {
    try {
      const { internalId, identity, benefitNumber } = req.body;
      const geolocation = {
        latitude: req.body.latitude || '-23.5489',
        longitude: req.body.longitude || '-46.6388'
      };

      if (!internalId || !identity || !benefitNumber) {
        throw new Error('Parâmetros obrigatórios ausentes: internalId, identity, benefitNumber.');
      }

      const result = await processContinuationUseCase.execute(internalId, identity, benefitNumber, geolocation);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, details: error.details });
    }
  }

  // Novo Endpoint: Checar IN100 e Finalizar (Manual Polling Front-end)
  public async checkIn100AndFinish(req: Request, res: Response): Promise<void> {
    try {
      const { internalId } = req.params;
      if (!internalId) {
        throw new Error('Parâmetro obrigatório ausente: internalId.');
      }

      const result = await in100WorkerUseCase.executeForSimulation(Number(internalId));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
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
          console.log('Aguardando 500ms para evitar rate limit na JoinBank...');
          await delay(500);
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
