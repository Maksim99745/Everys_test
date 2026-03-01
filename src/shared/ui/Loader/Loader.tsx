import { bem } from '@/shared/lib/bem';
import styles from './Loader.module.scss';

const cnLoader = bem(styles, 'loader');

export const Loader = () => {
  return (
    <div className={cnLoader()} aria-label="loading">
      <div className={cnLoader('spinner')} />
    </div>
  );
};
