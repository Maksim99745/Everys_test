import { ProductTable } from '@/entities/product';
import { Pagination } from '@/features/pagination';
import type { Product } from '@/shared/api/types';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
  page: number;
  totalPages: number;
  disabled: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const ProductsList = ({
  products,
  page,
  totalPages,
  disabled,
  onPrev,
  onNext,
}: ProductsListProps) => {
  return (
    <section className={styles.root}>
      <ProductTable products={products} />
      <Pagination page={page} totalPages={totalPages} disabled={disabled} onPrev={onPrev} onNext={onNext} />
    </section>
  );
};
