import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.root}>
      <h1 className={styles.logo}>Логотип</h1>
    </header>
  );
};
