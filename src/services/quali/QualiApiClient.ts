import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class QualiApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.QUALI_API_URL || 'https://integration.ajin.io';
    const apikey = process.env.QUALI_API_KEY;

    if (!apikey) {
      console.warn('WARNING: QUALI_API_KEY is not set in environment variables');
    }

    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'apikey': apikey || ''
      }
    });
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}
