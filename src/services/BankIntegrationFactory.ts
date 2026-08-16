import { IBankIntegrationService } from './interfaces/IBankIntegrationService';
import { QualiIntegrationService } from './quali/QualiIntegrationService';
import { FinantoIntegrationService } from './finanto/FinantoIntegrationService';

export class BankIntegrationFactory {
  public static getService(bankName?: string): IBankIntegrationService {
    const normalizedBank = (bankName || 'qualibank').toLowerCase();
    
    switch (normalizedBank) {
      case 'finanto':
        return new FinantoIntegrationService();
      case 'qualibank':
      case 'joinbank': // alias
      default:
        return new QualiIntegrationService();
    }
  }
}
