import styles from './styles/Card.module.css';
import type { ReactNode } from 'react';

interface MetricCardProps {
  children: ReactNode;
}

export function BarberServicesCard({ children }: MetricCardProps) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}

