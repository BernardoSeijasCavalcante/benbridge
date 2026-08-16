import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';
import { getDatabase } from '../database/sqlite';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ProcessLoanSimulationUseCase {
    private qualiService: QualiIntegrationService;

    constructor() {
        this.qualiService = new QualiIntegrationService();
    }

    private async logStep(db: any, internalId: number, step: string, success: boolean, data?: any) {
        await db.run(
            'INSERT INTO logs (simulation_internal_id, step, success, data) VALUES (?, ?, ?, ?)',
            [internalId, step, success ? 1 : 0, data ? JSON.stringify(data) : null]
        );
    }

    private parseMinMax(name: string): { min: number; max: number } {
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

    private filterAndSortRules(rules: any[], loanValue: number, desiredTerm?: number): any[] {
        const filtered = rules.filter(rule => {
            const name = rule.name || '';
            const normalizedName = name.toUpperCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, ' '); // remove múltiplos espaços

            // Descartar tabelas de carência (90D, 90 D)
            if (/90\s*D/.test(normalizedName)) return false;

            // Trabalhamos somente SEM SEGURO (S/ SEG, S/SEG, SEM SEGURO)
            if (!/S\/\s*SEG|SEM\s+SEGURO/.test(normalizedName)) return false;

            // Filtrar por prazo se solicitado pelo cliente
            const ruleTerm = rule.items?.[0]?.term;
            if (desiredTerm && ruleTerm !== desiredTerm) return false;

            // Filtrar faixa de saldo
            const { min, max } = this.parseMinMax(rule.name);
            if (loanValue < min || loanValue > max) return false;

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

    public async executeSmartCalculation(payload: any, internalId?: number, db?: any): Promise<{ approvedItems: any[] }> {
        const operationCode = payload.operationCode || 4;
        const rulesResponse = await this.qualiService.getProductRules(operationCode);
        const allRules = rulesResponse?.data || rulesResponse?.items || [];

        const items = payload.items || [];
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Nenhum item (contrato) enviado. A propriedade "items" é obrigatória e deve ser um array.');
        }

        const approvedItems = [];
        let isFirstCalculation = true; // Para evitar delay no primeiro cálculo absoluto

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let currentLoanValue = item.loanValue;
            let calculationSuccess = false;
            let approvedRuleId: string | null = null;
            let approvedRule: any = null;
            let calcResult: any = null;
            let attempts = 0;
            const maxAttempts = 3;
            const attemptsLogs: any[] = [];

            while (attempts < maxAttempts && !calculationSuccess) {
                const validRules = this.filterAndSortRules(allRules, currentLoanValue, item.desiredTerm);

                if (validRules.length === 0) {
                    if (attempts === 0) {
                        throw new Error(`Item ${i}: Não foram encontradas regras sem carência, sem seguro e aptas para o saldo inicial de R$ ${currentLoanValue}.`);
                    }
                    break;
                }

                if (attempts === 0) {
                    console.log('==================================================');
                    console.log(`Regras encontradas para o item ${i} (saldo R$ ${currentLoanValue}):`);
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
                            hasInsurance: item.hasInsurance || false,
                            installmentValue: item.installmentValue || item.originContract?.installmentValue,
                            loanValue: currentLoanValue,
                            rate: item.rate,
                            term: item.term || item.originContract?.term,
                            originContract: item.originContract ? {
                                lenderCode: item.originContract.lenderCode,
                                dueBalanceValue: item.originContract.dueBalanceValue,
                                ...(item.originContract.contractNumber !== undefined && { contractNumber: item.originContract.contractNumber }),
                                ...(item.originContract.contractDate !== undefined && { contractDate: item.originContract.contractDate }),
                                ...(item.originContract.term !== undefined && { term: item.originContract.term }),
                                ...(item.originContract.installmentsRemaining !== undefined && { installmentsRemaining: item.originContract.installmentsRemaining }),
                                ...(item.originContract.installmentValue !== undefined && { installmentValue: item.originContract.installmentValue })
                            } : null,
                            refinancing: item.refinancing ? {
                                term: rule.items?.[0]?.term || item.refinancing.term,
                                rate: rule.items?.[0]?.rate || item.refinancing.rate,
                                installmentValue: item.refinancing.installmentValue
                            } : undefined,
                            referenceCode: item.referenceCode || null
                        };

                        if (!isFirstCalculation) {
                            console.log('Aguardando 500ms para evitar rate limit na JoinBank...');
                            await delay(500);
                        }
                        isFirstCalculation = false;

                        calcResult = await this.qualiService.calculateSimulation(calcPayload);

                        const resultData = calcResult?.data?.[0] || calcResult?.data || calcResult;

                        let foundErrors = false;
                        let errorMessage = '';

                        if (Array.isArray(resultData?.erros) && resultData.erros.length > 0) {
                            foundErrors = true;
                            errorMessage = JSON.stringify(resultData.erros);
                        } else if (Array.isArray(resultData?.errors) && resultData.errors.length > 0) {
                            foundErrors = true;
                            errorMessage = JSON.stringify(resultData.errors);
                        } else if (Array.isArray(resultData?.refinancing?.erros) && resultData.refinancing.erros.length > 0) {
                            foundErrors = true;
                            errorMessage = JSON.stringify(resultData.refinancing.erros);
                        } else if (Array.isArray(resultData?.refinancing?.errors) && resultData.refinancing.errors.length > 0) {
                            foundErrors = true;
                            errorMessage = JSON.stringify(resultData.refinancing.errors);
                        }

                        if (foundErrors) {
                            throw new Error(`Cálculo negado pela regra (erros lógicos): ${errorMessage}`);
                        }

                        approvedRuleId = rule.id;
                        approvedRule = rule;
                        calculationSuccess = true;
                        if (db && internalId) await this.logStep(db, internalId, `step1_calc_item_${i}_attempt_${attempts}_rule_${rule.code}`, true, calcResult);
                        break;
                    } catch (error: any) {
                        const errLog = error.response?.data || error.message;
                        attemptsLogs.push({
                            ruleId: rule.id,
                            ruleCode: rule.code,
                            ruleName: rule.name,
                            attempt: attempts + 1,
                            loanValue: currentLoanValue,
                            error: errLog
                        });
                        if (db && internalId) await this.logStep(db, internalId, `step1_calc_item_${i}_attempt_${attempts}_rule_${rule.code}_failed`, false, { error: errLog });
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
                    message: `Falha na simulação do Item ${i}: Não foi possível aprovar o cálculo em nenhuma das tabelas aptas, mesmo após reduções de saldo (tentativas feitas: ${attempts}).`,
                    details: attemptsLogs
                };
            }

            approvedItems.push({
                approvedRuleId,
                approvedRule,
                currentLoanValue,
                calcResult,
                attempts,
                attemptsLogs,
                originalItem: item
            });
        }

        return { approvedItems };
    }

    public async executeUpToStep2(payload: any): Promise<any> {
        const db = await getDatabase();
        const executionTrace: string[] = [];

        const result = await db.run(
            'INSERT INTO simulations (status, payload) VALUES (?, ?)',
            ['pending', JSON.stringify(payload)]
        );
        const internalId = result.lastID;
        executionTrace.push('Banco de Dados Local: Registro Criado');

        if (!internalId) {
            throw new Error('Failed to insert simulation into local database');
        }

        let createPayload: any;

        try {
            // Passo 1: Smart Calculation
            const { approvedItems } = await this.executeSmartCalculation(payload, internalId, db);
            executionTrace.push('Passo 1 (Cálculo Prévio): Sucesso para todos os itens');

            const createItems = approvedItems.map(appItem => {
                const item = appItem.originalItem;
                const calcData = appItem.calcResult?.data?.[0] || (Array.isArray(appItem.calcResult?.data) ? appItem.calcResult.data[0] : (appItem.calcResult?.data || (Array.isArray(appItem.calcResult) ? appItem.calcResult[0] : appItem.calcResult)));
                const calcRefinancing = calcData?.refinancing;

                const refinancingData = item.refinancing ? {
                    term: calcRefinancing?.term || appItem.approvedRule?.items?.[0]?.term || item.refinancing?.term,
                    rate: calcRefinancing?.rate || appItem.approvedRule?.items?.[0]?.rate || item.refinancing?.rate,
                    installmentValue: calcRefinancing?.installmentValue || item.refinancing?.installmentValue
                } : undefined;

                return {
                    ruleId: appItem.approvedRuleId,
                    operationCode: payload.operationCode || 4,
                    loanValue: appItem.currentLoanValue,
                    term: item.term || item.originContract?.term,
                    installmentValue: item.installmentValue || item.originContract?.installmentValue,
                    rate: item.rate,
                    hasInsurance: item.hasInsurance || false,
                    originContract: item.originContract ? {
                        lenderCode: item.originContract.lenderCode,
                        dueBalanceValue: item.originContract.dueBalanceValue,
                        ...(item.originContract.contractNumber !== undefined && { contractNumber: item.originContract.contractNumber }),
                        ...(item.originContract.contractDate !== undefined && { contractDate: item.originContract.contractDate }),
                        ...(item.originContract.term !== undefined && { term: item.originContract.term }),
                        ...(item.originContract.installmentsRemaining !== undefined && { installmentsRemaining: item.originContract.installmentsRemaining }),
                        ...(item.originContract.installmentValue !== undefined && { installmentValue: item.originContract.installmentValue })
                    } : null,
                    ...(refinancingData && { refinancing: refinancingData }),
                    ...(item.referenceCode && { referenceCode: item.referenceCode })
                };
            });

            // Montar Payload do Passo 2
            createPayload = {
                ...payload.borrowerData,
                items: createItems,
                step: { code: 0, name: null },
                files: payload.files || [],
                ...(payload.validate !== undefined && { validate: payload.validate })
            };

            // Passo 2: Criação da Simulação
            const simResult = await this.qualiService.createSimulation(createPayload);
            const simulationId = simResult?.data?.simulation_id || simResult?.simulation_id || simResult?.id;
            executionTrace.push('Passo 2 (Criação da Proposta): Sucesso');

            if (!simulationId && !payload.validate) throw new Error('Falha ao obter simulation_id no Passo 2.');

            if (simulationId) {
                await db.run('UPDATE simulations SET simulation_id = ?, status = ? WHERE id = ?', [simulationId, 'created', internalId]);
                await this.logStep(db, internalId, 'step2_creation', true, { simulationId, fullResult: simResult });
            } else {
                await db.run('UPDATE simulations SET status = ? WHERE id = ?', ['validated', internalId]);
                await this.logStep(db, internalId, 'step2_validation', true, { result: simResult });
            }

            return {
                success: true,
                internalId,
                simulationId,
                step2Result: simResult,
                executionTrace,
                debugPayloadSent: createPayload
            };

        } catch (error: any) {
            executionTrace.push('Processo Falhou ou Abortado na etapa atual');
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : (error.message || 'Erro desconhecido');
            const details = error.details || { trace: executionTrace, payload_that_failed: payload, final_create_payload: createPayload };
            await this.logStep(db, internalId, 'error', false, { error: errorMessage, details });
            await db.run('UPDATE simulations SET status = ?, error_message = ? WHERE id = ?', ['error', errorMessage, internalId]);

            // eslint-disable-next-line no-throw-literal
            throw { message: `ProcessLoanSimulationUseCase Failed: ${errorMessage}`, details };
        }
    }

    public async execute(payload: any, geolocation: { latitude: string; longitude: string }): Promise<any> {
        const db = await getDatabase();

        const result = await db.run(
            'INSERT INTO simulations (status, payload) VALUES (?, ?)',
            ['pending', JSON.stringify(payload)]
        );
        const internalId = result.lastID;

        if (!internalId) {
            throw new Error('Failed to insert simulation into local database');
        }

        try {
            const { approvedItems } = await this.executeSmartCalculation(payload, internalId, db);

            const createItems = approvedItems.map(appItem => {
                const item = appItem.originalItem;
                const calcData = appItem.calcResult?.data?.[0] || (Array.isArray(appItem.calcResult?.data) ? appItem.calcResult.data[0] : (appItem.calcResult?.data || (Array.isArray(appItem.calcResult) ? appItem.calcResult[0] : appItem.calcResult)));
                const calcRefinancing = calcData?.refinancing;

                const refinancingData = item.refinancing ? {
                    term: calcRefinancing?.term || appItem.approvedRule?.items?.[0]?.term || item.refinancing?.term,
                    rate: calcRefinancing?.rate || appItem.approvedRule?.items?.[0]?.rate || item.refinancing?.rate,
                    installmentValue: calcRefinancing?.installmentValue || item.refinancing?.installmentValue
                } : undefined;

                return {
                    ruleId: appItem.approvedRuleId,
                    operationCode: payload.operationCode || 4,
                    loanValue: appItem.currentLoanValue,
                    term: item.term || item.originContract?.term,
                    installmentValue: item.installmentValue || item.originContract?.installmentValue,
                    rate: item.rate,
                    hasInsurance: item.hasInsurance || false,
                    originContract: item.originContract ? {
                        lenderCode: item.originContract.lenderCode,
                        dueBalanceValue: item.originContract.dueBalanceValue,
                        ...(item.originContract.contractNumber !== undefined && { contractNumber: item.originContract.contractNumber }),
                        ...(item.originContract.contractDate !== undefined && { contractDate: item.originContract.contractDate }),
                        ...(item.originContract.term !== undefined && { term: item.originContract.term }),
                        ...(item.originContract.installmentsRemaining !== undefined && { installmentsRemaining: item.originContract.installmentsRemaining }),
                        ...(item.originContract.installmentValue !== undefined && { installmentValue: item.originContract.installmentValue })
                    } : null,
                    ...(refinancingData && { refinancing: refinancingData }),
                    ...(item.referenceCode && { referenceCode: item.referenceCode })
                };
            });

            const createPayload = {
                ...payload.borrowerData,
                items: createItems,
                step: { code: 0, name: null },
                files: payload.files || [],
                ...(payload.validate !== undefined && { validate: payload.validate })
            };

            const simResult = await this.qualiService.createSimulation(createPayload);
            const simulationId = simResult?.data?.simulation_id || simResult?.simulation_id || simResult?.id;

            if (!simulationId) throw new Error('Falha ao obter simulation_id no Passo 2.');

            await db.run('UPDATE simulations SET simulation_id = ?, status = ? WHERE id = ?', [simulationId, 'created', internalId]);
            await this.logStep(db, internalId, 'step2_creation', true, { simulationId });

            const authTerm = await this.qualiService.getAuthTerm(simulationId);
            await this.logStep(db, internalId, 'step3_get_auth_term', true, authTerm);

            const termStatus = authTerm?.data?.status?.key || authTerm?.status?.key;
            const termKey = authTerm?.data?.key || authTerm?.key;

            if (termStatus !== 'signed') {
                const acceptResult = await this.qualiService.acceptAuthTerm(termKey, geolocation.latitude, geolocation.longitude);
                await this.logStep(db, internalId, 'step4_accept_auth_term', true, acceptResult);
            } else {
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

        } catch (error: any) {
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : (error.message || 'Erro desconhecido');
            const details = error.details || null;
            await this.logStep(db, internalId, 'error', false, { error: errorMessage, details });
            await db.run('UPDATE simulations SET status = ?, error_message = ? WHERE id = ?', ['error', errorMessage, internalId]);

            // eslint-disable-next-line no-throw-literal
            throw { message: `ProcessLoanSimulationUseCase Failed: ${errorMessage}`, details };
        }
    }
}