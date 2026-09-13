import styles from './profile-page-button.module.css';
import type { ReactNode } from 'react';

interface ProfilePageDefaultButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'icon' | 'compact' | 'social';
  ariaLabel?: string;
  className?: string;
}

export function ProfilePageDefaultButton({
  children,
  onClick,
  variant = 'icon',
  ariaLabel,
}: ProfilePageDefaultButtonProps) {
  const sizeClassName = variant === 'compact'
    ? styles.compact
    : variant === 'social'
      ? styles.social
      : styles.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${styles.button} ${sizeClassName}`}
    >
      {children}
    </button>
  );
}
