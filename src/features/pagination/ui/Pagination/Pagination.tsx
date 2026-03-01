import { bem } from '@/shared/lib/bem';
import { Button } from '@/shared/ui';
import styles from './Pagination.module.scss';

const cnPagination = bem(styles, 'pagination');

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => {
  return (
    <div className={cnPagination()}>
      <p className={cnPagination('info')}>
        Страница: {page} из {totalPages}
      </p>
      <div className={cnPagination('controls')}>
        <Button
          type="button"
          className={cnPagination('btn')}
          onClick={onPrev}
          disabled={page <= 1}
        >
          Предыдущая
        </Button>
        <Button
          type="button"
          className={cnPagination('btn')}
          onClick={onNext}
          disabled={page >= totalPages}
        >
          Следующая
        </Button>
      </div>
    </div>
  );
};
