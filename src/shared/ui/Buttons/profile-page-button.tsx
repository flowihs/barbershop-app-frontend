import type { ReactNode } from 'react';

interface ProfilePageDefaultButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'icon' | 'compact';
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
    ? 'h-8 px-3 text-[11px] font-bold'
    : 'h-11 w-11';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex cursor-pointer items-center justify-center rounded-xl border border-accent/40 text-accent transition-colors hover:border-accent hover:bg-bg-card-2 ${sizeClassName}`}
    >
      {children}
    </button>
  );
}
