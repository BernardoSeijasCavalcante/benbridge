"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLoanSimulationUseCase = void 0;
const QualiIntegrationService_1 = require("../services/quali/QualiIntegrationService");
const sqlite_1 = require("../database/sqlite");
class ProcessLoanSimulationUseCase {
    constructor() {
        this.qualiService = new QualiIntegrationService_1.QualiIntegrationService();
    }
    async logStep(db, internalId, step, success, data) {
        await db.run('INSERT INTO logs (simulation_internal_id, step, success, data) VALUES (?, ?, ?, ?)', [internalId, step, success ? 1 : 0, data ? JSON.stringify(data) : null]);
    }
    parseMinMax(name) {
        let min = 0;
        let max = Infinity;
        // Normaliza acentos e espaços múltiplos
        const normalized = name.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, ' ');
        // Extrair "saldo de 2mil a 5.999,99 mil" ou "2 a 5.999" ou "2.000 a 5.000"
        const rangeMatch = normalized.match(/(?:de\s+)?(\d+(?:[,.]\d+)?)\s*(?:mil|k)?\s*a\s*(\d+(?:[,.]\d+)?)\s*(?:mil|k)?/);
        if (rangeMatch) {
            const val1 = parseFloat(rangeMatch[1].replace(',', '.'));
            const val2 = parseFloat(rangeMatch[2].replace(',', '.'));
            min = val1 < 100 ? val1 * 1000 : val1;
            max = val2 < 100 ? val2 * 1000 : val2;
            return { min, max };
        }
        // Extrair "min 8 mil", "minimo 6", "min 30mil", "min 6.000"
        const minMatch = normalized.match(/(?:min(?:imo)?|partir de|acima de)\s*(\d+(?:[,.]\d+)?)\s*(?:mil|k)?/);
        if (minMatch) {
            const val = parseFloat(minMatch[1].replace(',', '.'));
            min = val < 100 ? val * 1000 : val;
            return { min, max };
        }
        return { min, max };
    }
    filterAndSortRules(rules, loanValue, desiredTerm) {
        const filtered = rules.filter(rule => {
            const name = rule.name || '';
            const normalizedName = name.toUpperCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, ' '); // remove múltiplos espaços
            // Descartar tabelas de carência (90D, 90 D)
            if (/90\s*D/.test(normalizedName))
                return false;
            // Trabalhamos somente SEM SEGURO (S/ SEG, S/SEG, SEM SEGURO)
            if (!/S\/\s*SEG|SEM\s+SEGURO/.test(normalizedName))
                return false;
            // Filtrar por prazo se solicitado pelo cliente
            const ruleTerm = rule.items?.[0]?.term;
            if (desiredTerm && ruleTerm !== desiredTerm)
                return false;
            // Filtrar faixa de saldo
            const { min, max } = this.parseMinMax(rule.name);
            if (loanValue < min || loanValue > max)
                return false;
            return true;
        });
        // Ordenar da maior taxa para a menor taxa (desc)
        filtered.sort((a, b) => {
            const rateA = a.items?.[0]?.rate || 0;
            const rateB = b.items?.[0]?.rate || 0;
            return rateB - rateA;
        });
        return filtered;
    }
    async executeSmartCalculation(payload, internalId, db) {
        const operationCode = payload.operationCode || 4;
        const rulesResponse = await this.qualiService.getProductRules(operationCode);
        const allRules = rulesResponse?.data || rulesResponse?.items || [];
        let currentLoanValue = payload.loanValue;
        let calculationSuccess = false;
        let approvedRuleId = null;
        let calcResult = null;
        let attempts = 0;
        const maxAttempts = 3;
        const attemptsLogs = [];
        while (attempts < maxAttempts && !calculationSuccess) {
            const validRules = this.filterAndSortRules(allRules, currentLoanValue, payload.desiredTerm);
            if (validRules.length === 0) {
                if (attempts === 0) {
                    throw new Error(`Não foram encontradas regras sem carência, sem seguro e aptas para o saldo inicial de R$ ${currentLoanValue}. O formato dos nomes das regras pode ter mudado.`);
                }
                break;
            }
            if (attempts === 0) {
                console.log('==================================================');
                console.log(`Regras encontradas para o saldo de R$ ${currentLoanValue}:`);
                console.log('==================================================');
                validRules.forEach(rule => {
                    console.log(JSON.stringify({
                        code: rule.code,
                        ruleId: rule.id,
                        operation: rule.name,
                        tax: rule.items?.[0]?.rate,
                        term: rule.items?.[0]?.term
                    }, null, 4));
                });
            }
            for (const rule of validRules) {
                try {
                    const calcPayload = {
                        ruleId: rule.id,
                        hasInsurance: payload.hasInsurance || false,
                        installmentValue: payload.installmentValue || payload.originContract?.installmentValue,
                        loanValue: currentLoanValue,
                        rate: payload.rate,
                        term: payload.term || payload.originContract?.term,
                        originContract: payload.originContract ? {
                            lenderCode: payload.originContract.lenderCode,
                            dueBalanceValue: payload.originContract.dueBalanceValue,
                            ...(payload.originContract.contractNumber !== undefined && { contractNumber: payload.originContract.contractNumber }),
                            ...(payload.originContract.contractDate !== undefined && { contractDate: payload.originContract.contractDate }),
                            ...(payload.originContract.term !== undefined && { term: payload.originContract.term }),
                            ...(payload.originContract.installmentsRemaining !== undefined && { installmentsRemaining: payload.originContract.installmentsRemaining }),
                            ...(payload.originContract.installmentValue !== undefined && { installmentValue: payload.originContract.installmentValue })
                        } : null,
                        refinancing: payload.refinancing ? {
                            term: rule.items?.[0]?.term || payload.refinancing.term,
                            rate: rule.items?.[0]?.rate || payload.refinancing.rate,
                            installmentValue: payload.refinancing.installmentValue
                        } : undefined,
                        referenceCode: payload.referenceCode || null
                    };
                    calcResult = await this.qualiService.calculateSimulation(calcPayload);
                    approvedRuleId = rule.id;
                    calculationSuccess = true;
                    if (db && internalId)
                        await this.logStep(db, internalId, `step1_calc_attempt_${attempts}_rule_${rule.code}`, true, calcResult);
                    break;
                }
                catch (error) {
                    const errLog = error.response?.data || error.message;
                    attemptsLogs.push({
                        ruleId: rule.id,
                        ruleCode: rule.code,
                        ruleName: rule.name,
                        attempt: attempts + 1,
                        loanValue: currentLoanValue,
                        error: errLog
                    });
                    if (db && internalId)
                        await this.logStep(db, internalId, `step1_calc_attempt_${attempts}_rule_${rule.code}_failed`, false, { error: errLog });
                }
            }
            if (calculationSuccess) {
                break;
            }
            currentLoanValue = Number((currentLoanValue * 0.95).toFixed(2));
            attempts++;
        }
        if (!calculationSuccess || !approvedRuleId) {
            // eslint-disable-next-line no-throw-literal
            throw {
                message: `Falha na simulação: Não foi possível aprovar o cálculo em nenhuma das tabelas aptas, mesmo após reduções de saldo (tentativas feitas: ${attempts}).`,
                details: attemptsLogs
            };
        }
        return { approvedRuleId, currentLoanValue, calcResult, attempts, attemptsLogs };
    }
    async executeUpToStep2(payload) {
        const db = await (0, sqlite_1.getDatabase)();
        const result = await db.run('INSERT INTO simulations (status, payload) VALUES (?, ?)', ['pending', JSON.stringify(payload)]);
        const internalId = result.lastID;
        if (!internalId) {
            throw new Error('Failed to insert simulation into local database');
        }
        try {
            // Passo 1: Smart Calculation
            const { approvedRuleId, currentLoanValue, calcResult } = await this.executeSmartCalculation(payload, internalId, db);
            // Montar Payload do Passo 2
            const createPayload = {
                ...payload.borrowerData,
                items: [
                    {
                        ruleId: approvedRuleId,
                        hasInsurance: payload.hasInsurance || false,
                        installmentValue: payload.installmentValue || payload.originContract?.installmentValue,
                        loanValue: currentLoanValue,
                        rate: payload.rate,
                        term: payload.term || payload.originContract?.term,
                        originContract: payload.originContract ? {
                            lenderCode: payload.originContract.lenderCode,
                            dueBalanceValue: payload.originContract.dueBalanceValue,
                            ...(payload.originContract.contractNumber !== undefined && { contractNumber: payload.originContract.contractNumber }),
                            ...(payload.originContract.contractDate !== undefined && { contractDate: payload.originContract.contractDate }),
                            ...(payload.originContract.term !== undefined && { term: payload.originContract.term }),
                            ...(payload.originContract.installmentsRemaining !== undefined && { installmentsRemaining: payload.originContract.installmentsRemaining }),
                            ...(payload.originContract.installmentValue !== undefined && { installmentValue: payload.originContract.installmentValue })
                        } : null,
                        refinancing: payload.refinancing ? {
                            term: calcResult?.data?.[0]?.refinancing?.term || payload.refinancing.term,
                            rate: calcResult?.data?.[0]?.refinancing?.rate || payload.refinancing.rate,
                            installmentValue: calcResult?.data?.[0]?.refinancing?.installmentValue || payload.refinancing.installmentValue
                        } : undefined,
                        referenceCode: payload.referenceCode || null,
                        ...calcResult?.data?.[0]
                    }
                ],
                step: { code: 0, name: null },
                files: payload.files || [],
                ...(payload.validate !== undefined && { validate: payload.validate })
            };
            // Passo 2: Criação da Simulação
            const simResult = await this.qualiService.createSimulation(createPayload);
            const simulationId = simResult?.data?.simulation_id || simResult?.simulation_id || simResult?.id;
            if (!simulationId && !payload.validate)
                throw new Error('Falha ao obter simulation_id no Passo 2.');
            if (simulationId) {
                await db.run('UPDATE simulations SET simulation_id = ?, status = ? WHERE id = ?', [simulationId, 'created', internalId]);
                await this.logStep(db, internalId, 'step2_creation', true, { simulationId, fullResult: simResult });
            }
            else {
                await db.run('UPDATE simulations SET status = ? WHERE id = ?', ['validated', internalId]);
                await this.logStep(db, internalId, 'step2_validation', true, { result: simResult });
            }
            return {
                success: true,
                internalId,
                simulationId,
                step2Result: simResult
            };
        }
        catch (error) {
            const errorMessage = error.message || (error.response?.data ? JSON.stringify(error.response.data) : 'Erro desconhecido');
            const details = error.details || null;
            await this.logStep(db, internalId, 'error', false, { error: errorMessage, details });
            await db.run('UPDATE simulations SET status = ?, error_message = ? WHERE id = ?', ['error', errorMessage, internalId]);
            // eslint-disable-next-line no-throw-literal
            throw { message: `ProcessLoanSimulationUseCase Failed: ${errorMessage}`, details };
        }
    }
    async execute(payload, geolocation) {
        const db = await (0, sqlite_1.getDatabase)();
        const result = await db.run('INSERT INTO simulations (status, payload) VALUES (?, ?)', ['pending', JSON.stringify(payload)]);
        const internalId = result.lastID;
        if (!internalId) {
            throw new Error('Failed to insert simulation into local database');
        }
        try {
            const { approvedRuleId, currentLoanValue, calcResult } = await this.executeSmartCalculation(payload, internalId, db);
            const createPayload = {
                ...payload.borrowerData,
                items: [
                    {
                        ruleId: approvedRuleId,
                        hasInsurance: payload.hasInsurance || false,
                        installmentValue: payload.installmentValue || payload.originContract?.installmentValue,
                        loanValue: currentLoanValue,
                        rate: payload.rate,
                        term: payload.term || payload.originContract?.term,
                        originContract: payload.originContract ? {
                            lenderCode: payload.originContract.lenderCode,
                            dueBalanceValue: payload.originContract.dueBalanceValue,
                            ...(payload.originContract.contractNumber !== undefined && { contractNumber: payload.originContract.contractNumber }),
                            ...(payload.originContract.contractDate !== undefined && { contractDate: payload.originContract.contractDate }),
                            ...(payload.originContract.term !== undefined && { term: payload.originContract.term }),
                            ...(payload.originContract.installmentsRemaining !== undefined && { installmentsRemaining: payload.originContract.installmentsRemaining }),
                            ...(payload.originContract.installmentValue !== undefined && { installmentValue: payload.originContract.installmentValue })
                        } : null,
                        refinancing: payload.refinancing ? {
                            term: calcResult?.data?.[0]?.refinancing?.term || payload.refinancing.term,
                            rate: calcResult?.data?.[0]?.refinancing?.rate || payload.refinancing.rate,
                            installmentValue: calcResult?.data?.[0]?.refinancing?.installmentValue || payload.refinancing.installmentValue
                        } : undefined,
                        referenceCode: payload.referenceCode || null,
                        ...calcResult?.data?.[0]
                    }
                ],
                step: { code: 0, name: null },
                files: payload.files || [],
                ...(payload.validate !== undefined && { validate: payload.validate })
            };
            const simResult = await this.qualiService.createSimulation(createPayload);
            const simulationId = simResult?.data?.simulation_id || simResult?.simulation_id || simResult?.id;
            if (!simulationId)
                throw new Error('Falha ao obter simulation_id no Passo 2.');
            await db.run('UPDATE simulations SET simulation_id = ?, status = ? WHERE id = ?', [simulationId, 'created', internalId]);
            await this.logStep(db, internalId, 'step2_creation', true, { simulationId });
            const authTerm = await this.qualiService.getAuthTerm(simulationId);
            await this.logStep(db, internalId, 'step3_get_auth_term', true, authTerm);
            const termStatus = authTerm?.data?.status?.key || authTerm?.status?.key;
            const termKey = authTerm?.data?.key || authTerm?.key;
            if (termStatus !== 'signed') {
                const acceptResult = await this.qualiService.acceptAuthTerm(termKey, geolocation.latitude, geolocation.longitude);
                await this.logStep(db, internalId, 'step4_accept_auth_term', true, acceptResult);
            }
            else {
                await this.logStep(db, internalId, 'step4_accept_auth_term', true, { skipped: true, reason: 'Already signed' });
            }
            await db.run('UPDATE simulations SET status = ? WHERE id = ?', ['auth_term_signed', internalId]);
            const actionsResult = await this.qualiService.createContracts(simulationId);
            await this.logStep(db, internalId, 'step5_create_contracts', true, actionsResult);
            await db.run('UPDATE simulations SET status = ? WHERE id = ?', ['contracts_created', internalId]);
            const finalContracts = await this.qualiService.querySimulationContracts(simulationId);
            await this.logStep(db, internalId, 'step6_query_contracts', true, finalContracts);
            await db.run('UPDATE simulations SET status = ?, response = ? WHERE id = ?', ['completed', JSON.stringify(finalContracts), internalId]);
            return {
                success: true,
                internalId,
                simulationId,
                contracts: finalContracts
            };
        }
        catch (error) {
            const errorMessage = error.message || (error.response?.data ? JSON.stringify(error.response.data) : 'Erro desconhecido');
            const details = error.details || null;
            await this.logStep(db, internalId, 'error', false, { error: errorMessage, details });
            await db.run('UPDATE simulations SET status = ?, error_message = ? WHERE id = ?', ['error', errorMessage, internalId]);
            // eslint-disable-next-line no-throw-literal
            throw { message: `ProcessLoanSimulationUseCase Failed: ${errorMessage}`, details };
        }
    }
}
exports.ProcessLoanSimulationUseCase = ProcessLoanSimulationUseCase;
