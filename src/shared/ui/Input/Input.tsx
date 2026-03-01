import { useId } from 'react';
import { bem } from '@/shared/lib/bem';
import styles from './Input.module.scss';

const cnInput = bem(styles, 'input');

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  compact?: boolean;
}

export const Input = ({ label, id, compact, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const mod = compact ? 'compact' : undefined;

  if (!label) {
    return <input id={inputId} className={cnInput('field', mod)} {...props} />;
  }

  return (
    <div className={cnInput()}>
      <label className={cnInput('label')} htmlFor={inputId}>
        {label}
      </label>
      <input id={inputId} className={cnInput('field', mod)} {...props} />
    </div>
  );
};
