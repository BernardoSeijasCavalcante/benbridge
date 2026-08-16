"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationController = void 0;
const axios_1 = __importDefault(require("axios"));
const ProcessLoanSimulationUseCase_1 = require("../useCases/ProcessLoanSimulationUseCase");
const IN100WorkerUseCase_1 = require("../useCases/IN100WorkerUseCase");
const QualiIntegrationService_1 = require("../services/quali/QualiIntegrationService");
const sqlite_1 = require("../database/sqlite");
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const qualiService = new QualiIntegrationService_1.QualiIntegrationService();
const processUseCase = new ProcessLoanSimulationUseCase_1.ProcessLoanSimulationUseCase();
const in100WorkerUseCase = new IN100WorkerUseCase_1.IN100WorkerUseCase();
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
    // Novo Endpoint: Smart Creation (Datahub + Passos 1 e 2)
    async processSmartCreation(req, res) {
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
            const datahubClient = axios_1.default.create({
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
            const parseAddress = (endereco) => {
                if (!endereco)
                    return { street: 'NÃO INFORMADO', number: 'SN' };
                const match = endereco.match(/(.+?)\s+(\d+)$/);
                if (match) {
                    return { street: match[1].trim(), number: match[2] };
                }
                return { street: endereco.trim(), number: 'SN' };
            };
            const getEmailFromName = (nome) => {
                if (!nome)
                    return 'nome.sobrenome@gmail.com';
                const parts = nome.trim().toLowerCase().split(' ').filter(p => p.length > 0);
                if (parts.length >= 2) {
                    return `${parts[0]}.${parts[parts.length - 1]}@gmail.com`;
                }
                return `${parts[0]}@gmail.com`;
            };
            const extractDigit = (conta) => {
                if (!conta)
                    return { number: '', digit: '0' };
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
            const db = await (0, sqlite_1.getDatabase)();
            const result = await db.run('INSERT INTO simulations (status, payload) VALUES (?, ?)', ['pending_in100', JSON.stringify(processPayload)]);
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
            await db.run('UPDATE simulations SET in100_query_id = ?, in100_auth_url = ?, in100_status = ? WHERE id = ?', [queryId, authUrl || null, 'pending_authorization', internalId]);
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
                message: 'Dados recuperados, payload salvo e IN100 iniciada. Aguardando autorização do cliente.'
            });
        }
        catch (error) {
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
    async checkIn100AndFinish(req, res) {
        try {
            const { internalId } = req.params;
            const { latitude, longitude } = req.body; // Geolocalização real enviada pelo client
            if (!internalId) {
                throw new Error('Parâmetro obrigatório ausente: internalId.');
            }
            const result = await in100WorkerUseCase.executeForSimulation(Number(internalId), undefined, latitude, longitude);
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
        }
        catch (error) {
            res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
        }
    }
    async create(req, res) {
        try {
            const payloadToSend = { ...req.body };
            delete payloadToSend.operationCode;
            if (Array.isArray(payloadToSend.items)) {
                payloadToSend.items = payloadToSend.items.map((item) => {
                    const { hasInsurance, operationCode, ...rest } = item;
                    return rest;
                });
            }
            const result = await qualiService.createSimulation(payloadToSend);
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
