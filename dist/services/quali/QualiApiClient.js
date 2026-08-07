"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualiApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class QualiApiClient {
    constructor() {
        const baseURL = process.env.QUALI_API_URL || 'https://integration.ajin.io';
        const apikey = process.env.QUALI_API_KEY;
        if (!apikey) {
            console.warn('WARNING: QUALI_API_KEY is not set in environment variables');
        }
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'apikey': apikey || ''
            }
        });
    }
    getClient() {
        return this.client;
    }
}
exports.QualiApiClient = QualiApiClient;
