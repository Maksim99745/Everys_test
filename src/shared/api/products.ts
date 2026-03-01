import { apiClient } from './client';
import type {
  ApiEnvelope,
  Product,
  ProductsRequest,
  ProductsResponse,
  StockCollectionApi,
  StockItemApi,
} from './types';

const DEFAULT_ORDER_BY = 'code';
const DEFAULT_ORDER_DIRECTION = 'asc';

export const mapStockItem = (item: StockItemApi): Product => ({
  code: item.code ?? '',
  title: item.title ?? '',
  manufacturer: item.manufacturer ?? '',
  description: item.description ?? '',
  price: item.price ?? '',
  stock: item.stock ?? 0,
});

const escapeFilterValue = (value: string): string => value.replace(/'/g, "''");

export const buildStockFilter = (search: string): string | undefined => {
  const trimmed = search.trim();
  if (!trimmed) {
    return undefined;
  }

  const escaped = escapeFilterValue(trimmed);
  return [
    `contains(title,'${escaped}')`,
    `contains(description,'${escaped}')`,
    `contains(manufacturer,'${escaped}')`,
  ].join(' or ');
};

export const productsApi = {
  async getProducts(params: ProductsRequest): Promise<ProductsResponse> {
    try {
      const response = await apiClient.http.get<ApiEnvelope<StockCollectionApi>>('/v1/Stock', {
        signal: params.signal,
        params: {
          Skip: params.skip,
          Take: params.take,
          Filter: buildStockFilter(params.search ?? ''),
          OrderBy: DEFAULT_ORDER_BY,
          OrderDirection: DEFAULT_ORDER_DIRECTION,
        },
      });

      if (response.data.status === 'Error') {
        throw new Error(response.data.errors || 'Сервис временно недоступен');
      }

      const result = response.data.result;
      if (!result) {
        return { totalItems: 0, items: [] };
      }

      return {
        totalItems: result.totalItems || 0,
        items: (result.items ?? []).map(mapStockItem),
      };
    } catch (error) {
      throw apiClient.toApiError(error);
    }
  },
};
