import { Clock, SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { CategoryImage } from '@/entities/provision';
import styles from './styles/ProvisionShortCard.module.css';

interface ProvisionShortCardProps {
  provisionId: number;
  title: string;
  price: number;
  time: number;
  categoryName?: string;
  categoryImage?: string;
}

export function ProvisionShortCard({
  provisionId,
  title,
  price,
  time,
  categoryName = 'Service',
  categoryImage,
}: ProvisionShortCardProps) {
  return (
    <Link
      to={`/provisions/${provisionId}`}
      aria-label={`Open ${title}`}
      className={styles.cardLink}
    >
      <article className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <CategoryImage category={{ name: categoryName, image: categoryImage }} />
            <div>
              <h3 className={styles.title}>{title}</h3>

              <div className={styles.duration}>
                <Clock size={12} strokeWidth={1.8} />
                <span>{time} min</span>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <span className={styles.price}>${price}</span>
            <span className={styles.link} aria-hidden="true">
            <SquareArrowOutUpRight size={16} strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
