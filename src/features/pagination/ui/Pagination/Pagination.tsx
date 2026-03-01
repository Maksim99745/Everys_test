import { Button } from '@/shared/ui';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({ page, totalPages, disabled, onPrev, onNext }: PaginationProps) => {
  return (
    <div className={styles.root}>
      <p className={styles.info}>
        Страница: {page} из {totalPages}
      </p>
      <div className={styles.controls}>
        <Button onClick={onPrev} disabled={disabled || page <= 1}>
          Предыдущая
        </Button>
        <Button onClick={onNext} disabled={disabled || page >= totalPages}>
          Следующая
        </Button>
      </div>
    </div>
  );
};
