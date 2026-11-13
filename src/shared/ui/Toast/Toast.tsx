import { useEffect } from 'react';
import styles from './styles/Toast.module.css';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, isOpen, onClose, duration = 2400 }: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timeout = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, isOpen, onClose]);

  if (!isOpen) return null;
  return <div className={styles.toast} role="status" aria-live="polite">{message}</div>;
}
