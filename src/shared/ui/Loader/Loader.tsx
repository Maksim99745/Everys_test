import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.root} aria-label="loading">
      <div className={styles.spinner} />
    </div>
  );
};
