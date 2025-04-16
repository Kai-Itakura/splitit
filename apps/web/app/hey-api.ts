import type { CreateClientConfig } from '@hey-api/client-next';
import { API_URL } from './constants/api-url';

export const createClientConfig: CreateClientConfig = (config) => {
  console.log('☀ ~ API_URL:', API_URL);
  return {
    ...config,
    baseUrl: API_URL,
  };
};
