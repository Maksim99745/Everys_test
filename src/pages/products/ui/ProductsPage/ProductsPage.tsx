import { Pagination } from '@/features/pagination';
import { SearchBar } from '@/features/search-products';
import { ProductTable } from '@/entities/product';
import { ErrorMessage, Loader } from '@/shared/ui';
import { DefaultLayout } from '@/app/layouts';
import { bem } from '@/shared/lib/bem';
import styles from './ProductsPage.module.scss';
import { useProductsSearch } from '@/pages/products/model/useProductsSearch';

const cnProductsPage = bem(styles, 'products-page');

export const ProductsPage = () => {
  const {
    query,
    products,
    totalPages,
    isLoading,
    error,
    handleSearchSubmit,
    handlePrev,
    handleNext,
  } = useProductsSearch();

  return (
    <DefaultLayout>
      <div className={cnProductsPage()}>
        <div className={cnProductsPage('container')}>
        <SearchBar isLoading={isLoading} onSubmit={handleSearchSubmit} />

        {error && <ErrorMessage message={error} />}
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <section className={cnProductsPage('section')}>
            <ProductTable products={products} searchQuery={query.search} />
            <Pagination
              page={query.page}
              totalPages={totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </section>
        )}
        </div>
      </div>
    </DefaultLayout>
  );
};
