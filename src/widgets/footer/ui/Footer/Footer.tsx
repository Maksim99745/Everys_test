import { bem } from '@/shared/lib/bem';
import styles from './Footer.module.scss';

const cnFooter = bem(styles, 'footer');

export const Footer = () => {
  return (
    <footer className={cnFooter()}>
      <div className={cnFooter('inner')}>
        <p className={cnFooter('text')}>Слоган</p>
      </div>
    </footer>
  );
};
