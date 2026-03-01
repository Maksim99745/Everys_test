import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { productsApi, DEFAULT_COUNT } from '@/shared/api/products';
import type { ApiError, StockItemApi } from '@/shared/api/types';

export interface ProductsQuery {
  page: number;
  count: number;
  search: string;
}

export function useProductsSearch() {
  const [query, setQuery] = useState<ProductsQuery>({
    page: 1,
    count: DEFAULT_COUNT,
    search: '',
  });
  const [products, setProducts] = useState<StockItemApi[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(totalItems / query.count);
    return pages > 0 ? pages : 1;
  }, [totalItems, query.count]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productsApi.getProducts({
          skip: (query.page - 1) * query.count,
          count: query.count,
          search: query.search,
          signal: controller.signal,
        });

        if (requestId !== requestIdRef.current) return;

        setProducts(data.items);
        setTotalItems(data.totalItems);
      } catch (unknownError) {
        const apiError = unknownError as ApiError;
        if (apiError.message === 'Запрос отменен') return;

        setProducts([]);
        setTotalItems(0);
        setError(apiError.message || 'Не удалось загрузить данные');
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSearchSubmit = useCallback((search: string, count: number) => {
    setQuery((prev) => ({ ...prev, page: 1, search, count }));
  }, []);

  const handlePrev = useCallback(() => {
    setQuery((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  }, []);

  const handleNext = useCallback(() => {
    setQuery((prev) => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }));
  }, [totalPages]);

  return {
    query,
    products,
    totalPages,
    isLoading,
    error,
    handleSearchSubmit,
    handlePrev,
    handleNext,
  };
}
