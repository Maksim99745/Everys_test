export interface StockItemApi {
  code: string | null;
  title: string | null;
  manufacturer: string | null;
  description: string | null;
  price: string | null;
  stock: number;
}

export interface StockCollectionApi {
  totalItems: number;
  items: StockItemApi[] | null;
}

export interface ApiEnvelope<T> {
  result?: T;
  status: 'Ok' | 'Error';
  errors?: string;
  requestId?: string;
}

export interface Product {
  code: string;
  title: string;
  manufacturer: string;
  description: string;
  price: string;
  stock: number;
}

export interface ProductsRequest {
  search?: string;
  skip: number;
  take: number;
  signal?: AbortSignal;
}

export interface ProductsResponse {
  totalItems: number;
  items: Product[];
}

export interface ApiError {
  message: string;
  status?: number;
}
