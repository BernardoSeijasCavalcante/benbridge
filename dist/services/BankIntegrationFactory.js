"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankIntegrationFactory = void 0;
const QualiIntegrationService_1 = require("./quali/QualiIntegrationService");
const FinantoIntegrationService_1 = require("./finanto/FinantoIntegrationService");
class BankIntegrationFactory {
    static getService(bankName) {
        const normalizedBank = (bankName || 'qualibank').toLowerCase();
        switch (normalizedBank) {
            case 'finanto':
                return new FinantoIntegrationService_1.FinantoIntegrationService();
            case 'qualibank':
            case 'joinbank': // alias
            default:
                return new QualiIntegrationService_1.QualiIntegrationService();
        }
    }
}
exports.BankIntegrationFactory = BankIntegrationFactory;
