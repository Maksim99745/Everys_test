import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import { bem } from '@/shared/lib/bem';
import styles from './Button.module.scss';

const cnBtn = bem(styles, 'btn');

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={cn(cnBtn(), className)} {...props} />;
};
