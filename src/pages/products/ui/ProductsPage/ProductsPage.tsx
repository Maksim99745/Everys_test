import { useEffect, useMemo, useRef, useState } from 'react';
import { SearchBar } from '@/features/search-products';
import { productsApi } from '@/shared/api/products';
import type { ApiError, Product } from '@/shared/api/types';
import { ErrorMessage, Loader } from '@/shared/ui';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { ProductsList } from '@/widgets/products-list';
import type { ProductsPageTemplate } from '../../model/template';
import styles from './ProductsPage.module.scss';

interface QueryState {
  page: number;
  take: number;
  search: string;
}

interface ProductsPageProps {
  template?: ProductsPageTemplate;
}

const DEFAULT_TAKE = 3;

export const ProductsPage = ({ template = 'default' }: ProductsPageProps) => {
  const [query, setQuery] = useState<QueryState>({
    page: 1,
    take: DEFAULT_TAKE,
    search: '',
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(totalItems / query.take);
    return pages > 0 ? pages : 1;
  }, [totalItems, query.take]);

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
          skip: (query.page - 1) * query.take,
          take: query.take,
          search: query.search,
          signal: controller.signal,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        setProducts(data.items);
        setTotalItems(data.totalItems);
      } catch (unknownError) {
        const apiError = unknownError as ApiError;
        if (apiError.message === 'Запрос отменен') {
          return;
        }
        setProducts([]);
        setTotalItems(0);
        setError(apiError.message || 'Ошибка загрузки данных');
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

  return (
    <div className={[styles.page, template === 'default' && styles.templateDefault].filter(Boolean).join(' ')}>
      <div className={styles.container}>
        <Header />
        <SearchBar
          defaultTake={DEFAULT_TAKE}
          isLoading={isLoading}
          onSubmit={(search, take) => {
            setQuery({ page: 1, search, take });
          }}
        />

        {error && <ErrorMessage message={error} />}
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <ProductsList
            products={products}
            page={query.page}
            totalPages={totalPages}
            disabled={isLoading}
            onPrev={() => setQuery((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            onNext={() => setQuery((prev) => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};
