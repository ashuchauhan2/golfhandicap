import axios from 'axios';
import type { Round } from '../types/Round';
import { APP_CONFIG } from '../config/app';

const API_BASE_URL = APP_CONFIG.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const roundService = {
  async addRound(round: Omit<Round, 'id'>): Promise<Round> {
    const response = await api.post<Round>('/rounds', round);
    return response.data;
  },
  
  async getHandicap(): Promise<number> {
    const response = await api.get<number>('/handicap');
    return response.data;
  },
};