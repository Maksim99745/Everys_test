import axios, { AxiosError, type AxiosInstance } from 'axios';
import { config } from '@/shared/config/env';
import type { ApiError } from './types';

class ApiClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.apiUrl,
      auth: {
        username: config.apiUsername,
        password: config.apiPassword,
      },
      timeout: 15000,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  get http(): AxiosInstance {
    return this.instance;
  }

  toApiError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ errors?: string }>;
      if (err.code === 'ERR_CANCELED') {
        return { message: 'Запрос отменен' };
      }

      if (err.response?.status === 401) {
        return { message: 'Ошибка авторизации API', status: 401 };
      }

      return {
        message:
          err.response?.data?.errors ||
          err.message ||
          'Ошибка при обращении к серверу',
        status: err.response?.status,
      };
    }

    return { message: 'Неизвестная ошибка' };
  }
}

export const apiClient = new ApiClient();
