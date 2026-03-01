import { useId } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, id, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  if (!label) {
    return <input id={inputId} className={styles.input} {...props} />;
  }

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input id={inputId} className={styles.input} {...props} />
    </div>
  );
};
