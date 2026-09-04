import type { ReactNode } from 'react';

interface MetricCardProps {
  children: ReactNode;
}

export function BarberServicesCard({ children }: MetricCardProps) {
  return (
    <div className="flex min-h-16 flex-1 flex-col justify-center rounded-lg bg-bg-slot px-3 py-2.5">
      {children}
    </div>
  );
}

