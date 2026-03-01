import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div role="alert" className={styles.root}>
      {message}
    </div>
  );
};
