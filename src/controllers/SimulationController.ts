import { Request, Response } from 'express';
import axios from 'axios';
import { ProcessLoanSimulationUseCase } from '../useCases/ProcessLoanSimulationUseCase';
import { IN100WorkerUseCase } from '../useCases/IN100WorkerUseCase';
import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';
import { getDatabase } from '../database/sqlite';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const qualiService = new QualiIntegrationService();
const processUseCase = new ProcessLoanSimulationUseCase();
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
      const { beneficio, items, files, validate, bank = 'qualibank' } = req.body;
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

      const missingData: string[] = [];

      // Dados pessoais e do Benefício
      if (!offlineData.Beneficiario.Nome) missingData.push('nome');
      if (!offlineData.Beneficiario.DataNascimento) missingData.push('dataNascimento');
      if (!offlineData.Beneficiario.NomeMae) missingData.push('nomeMae');
      if (!offlineData.Beneficiario.Rg) missingData.push('rg');
      if (!offlineData.Beneficiario.CPF) missingData.push('cpf');
      if (!offlineData.Beneficiario.Beneficio) missingData.push('beneficio');
      if (!offlineData.Beneficiario.Especie) missingData.push('especie');

      // Endereço
      if (!offlineData.Beneficiario.Endereco) missingData.push('endereco');
      if (!offlineData.Beneficiario.Bairro) missingData.push('bairro');
      if (!offlineData.Beneficiario.Cidade) missingData.push('cidade');
      if (!offlineData.Beneficiario.CEP) missingData.push('cep');

      // Dados Bancários
      if (!offlineData.DadosBancarios?.Banco) missingData.push('banco');
      if (!offlineData.DadosBancarios?.Agencia) missingData.push('agencia');
      if (!offlineData.DadosBancarios?.ContaPagto) missingData.push('conta');

      // Rendimento
      if (!offlineData.ResumoFinanceiro?.ValorBeneficio) missingData.push('renda');

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
          name: offlineData.Beneficiario.Nome || 'NOME NÃO INFORMADO',
          identity: offlineData.Beneficiario.CPF,
          benefit: offlineData.Beneficiario.Beneficio,
          benefitState: offlineData.Beneficiario.UFBeneficio || offlineData.Beneficiario.UF || 'SP',
          benefitStartDate: offlineData.Beneficiario.DIB || '2020-01-01',
          benefitPaymentMethod: offlineData.DadosBancarios?.MeioPagamento === "2" ? 2 : 1,
          benefitType: offlineData.Beneficiario.Especie ? parseInt(offlineData.Beneficiario.Especie, 10) : 42,
          birthDate: offlineData.Beneficiario.DataNascimento || '1970-01-01',
          motherName: offlineData.Beneficiario.NomeMae || 'MAE NAO INFORMADA',
          maritalStatus: 'Solteiro', // Regra: Sempre solteiro
          sex: offlineData.Beneficiario.Sexo === 'M' ? 'Masculino' : 'Feminino',
          income: offlineData.ResumoFinanceiro?.ValorBeneficio || 1500,
          phone: offlineData.Telefone && offlineData.Telefone.length > 0 ? offlineData.Telefone[0] : '11999999999',
          email: email,
          address: {
            street: addr.street,
            number: addr.number,
            complement: '',
            district: offlineData.Beneficiario.Bairro || 'Centro',
            city: offlineData.Beneficiario.Cidade || 'São Paulo',
            state: offlineData.Beneficiario.UF || 'SP',
            zipCode: offlineData.Beneficiario.CEP || '01001000'
          },
          document: {
            type: { code: 'RG', name: 'Registro Geral' },
            number: offlineData.Beneficiario.Rg || '000000000',
            issuingDate: '2022-10-10', // Regra definida
            issuingEntity: 'SSP', // Regra definida
            issuingState: offlineData.Beneficiario.UF || 'SP'
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
        bank
      };

      const db = await getDatabase();
      const result = await db.run(
        'INSERT INTO simulations (status, payload) VALUES (?, ?)',
        ['pending_in100', JSON.stringify(processPayload)]
      );
      const internalId = result.lastID;

      if (!internalId) {
        throw new Error('Falha ao inserir simulação no banco de dados local.');
      }

      // Iniciar Consulta IN100
      const in100Result = await qualiService.initiateIN100Query(borrowerData.borrower.identity, borrowerData.borrower.benefit);
      
      const queryId = in100Result?.data?.id || in100Result?.id || in100Result?.query_inss_balance_id;
      const authUrl = in100Result?.data?.authorizationUrl || in100Result?.data?.link || in100Result?.authorizationUrl || in100Result?.link;

      if (!queryId) {
        throw new Error('Identificador da consulta IN100 não retornado pela bancarizadora.');
      }

      await db.run(
        'UPDATE simulations SET in100_query_id = ?, in100_auth_url = ?, in100_status = ? WHERE id = ?',
        [queryId, authUrl || null, 'pending_authorization', internalId]
      );

      let responseMessage = 'Dados recuperados, payload salvo e IN100 iniciada. Aguardando autorização do cliente.';
      if (missingData.length > 0) {
        responseMessage = 'Atenção: faltam dados vitais do Datahub. Envie-os na próxima requisição (check-in100-and-finish). ' + responseMessage;
      }

      res.status(200).json({
        success: true,
        internalId,
        identity: borrowerData.borrower.identity,
        benefitNumber: borrowerData.borrower.benefit,
        in100: {
          queryId,
          authUrl,
          status: 'pending_authorization'
        },
        missingData,
        message: responseMessage
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

  // Novo Endpoint: Checar IN100 e Processar Restante do Fluxo
  public async checkIn100AndFinish(req: Request, res: Response): Promise<void> {
    try {
      const { internalId } = req.params;
      const { latitude, longitude, borrowerDataOverrides } = req.body; // Geolocalização e dados vitais preenchidos

      if (!internalId) {
        throw new Error('Parâmetro obrigatório ausente: internalId.');
      }

      const result = await in100WorkerUseCase.executeForSimulation(Number(internalId), undefined, latitude, longitude, borrowerDataOverrides);
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
      
      for (let i = 0; i < items.length; i++) {
        if (items[i].originContract && !items[i].originContract.contractDate) {
          throw new Error(`Item ${i}: O atributo "contractDate" é obrigatório dentro de "originContract".`);
        }
      }
      
      const results = [];
      for (let i = 0; i < items.length; i++) {
        if (i > 0) {
          console.log('Aguardando 500ms para evitar rate limit na JoinBank...');
          await delay(500);
        }
        
        const payloadToSend = { ...items[i] };
        delete payloadToSend.hasInsurance;
        delete payloadToSend.operationCode;

        const calcResult = await qualiService.calculateSimulation(payloadToSend);
        results.push(calcResult);
      }
      
      res.status(200).json({ success: true, data: results });
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const payloadToSend = { ...req.body };
      delete payloadToSend.operationCode;
      
      if (Array.isArray(payloadToSend.items)) {
        payloadToSend.items = payloadToSend.items.map((item: any) => {
          const { hasInsurance, operationCode, ...rest } = item;
          return rest;
        });
      }

      const result = await qualiService.createSimulation(payloadToSend);
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
