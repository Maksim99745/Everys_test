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
      timeout: config.apiTimeout,
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
        return { message: 'Ошибка доступа к API', status: 401 };
      }

      return {
        message:
          err.response?.data?.errors ||
          err.message ||
          'Не удалось связаться с сервером',
        status: err.response?.status,
      };
    }

    return { message: 'Что-то пошло не так' };
  }
}

export const apiClient = new ApiClient();
