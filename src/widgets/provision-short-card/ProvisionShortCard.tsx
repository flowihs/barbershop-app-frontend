import { Clock, SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router';

interface ProvisionShortCardProps {
  provisionId: number;
  title: string;
  price: number;
  time: number;
}

export function ProvisionShortCard({
  provisionId,
  title,
  price,
  time,
}: ProvisionShortCardProps) {
  return (
    <article className="w-full py-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 truncate text-sm font-semibold leading-5 text-text-primary">
          {title}
        </h3>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-bold text-bg-textholder-area">
            ${price}
          </span>
          <Link
            to={`/provisions/${provisionId}`}
            aria-label={`Open ${title}`}
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <SquareArrowOutUpRight size={13} strokeWidth={1.8} />
          </Link>
        </div>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5 text-text-secondary">
        <Clock size={12} strokeWidth={1.8} />
        <span className="text-xs">{time} min</span>
      </div>
    </article>
  );
}
