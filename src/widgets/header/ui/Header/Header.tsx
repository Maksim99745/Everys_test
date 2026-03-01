import { bem } from '@/shared/lib/bem';
import styles from './Header.module.scss';

const cnHeader = bem(styles, 'header');

export const Header = () => {
  return (
    <header className={cnHeader()}>
      <div className={cnHeader('inner')}>
        <h1 className={cnHeader('logo')}>Логотип</h1>
      </div>
    </header>
  );
};
