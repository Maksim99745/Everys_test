import { config } from '@/shared/config/env';
import { apiClient } from './client';
import type {
  ApiEnvelope,
  ProductsRequest,
  ProductsResponse,
  StockCollectionApi,
} from './types';

const DEFAULT_ORDER_BY = 'code';
const DEFAULT_ORDER_DIRECTION = 'asc';
export const DEFAULT_COUNT = 3;
const RETRY_DELAY_MS = 500;

async function withRetry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    const isAborted = (e as { code?: string }).code === 'ERR_CANCELED';
    const isAuthError = (e as { response?: { status?: number } }).response?.status === 401;
    if (retries <= 0 || isAborted || isAuthError) throw e;
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    return withRetry(fn, retries - 1);
  }
}

export const productsApi = {
  async getProducts(params: ProductsRequest): Promise<ProductsResponse> {
    try {
      const paramsObj: Record<string, string | number> = {
        Skip: params.skip,
        Take: params.count,
        OrderBy: DEFAULT_ORDER_BY,
        OrderDirection: DEFAULT_ORDER_DIRECTION,
      };
      const search = params.search?.trim();
      if (search) {
        paramsObj.Filter = search;
      }

      const response = await withRetry(
        () =>
          apiClient.http.get<ApiEnvelope<StockCollectionApi>>('/v1/Stock', {
            signal: params.signal,
            params: paramsObj,
          }),
        config.apiRetryCount
      );

      if (response.data.status === 'Error') {
        throw new Error(response.data.errors || 'Сервис временно недоступен. Попробуйте позже.');
      }

      const result = response.data.result;
      if (!result) {
        return { totalItems: 0, items: [] };
      }

      return {
        totalItems: result.totalItems || 0,
        items: result.items ?? [],
      };
    } catch (error) {
      throw apiClient.toApiError(error);
    }
  },
};
