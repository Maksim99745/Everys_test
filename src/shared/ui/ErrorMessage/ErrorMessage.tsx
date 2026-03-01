import { bem } from '@/shared/lib/bem';
import styles from './ErrorMessage.module.scss';

const cnErrorMessage = bem(styles, 'error-message');

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div role="alert" className={cnErrorMessage()}>
      {message}
    </div>
  );
};
