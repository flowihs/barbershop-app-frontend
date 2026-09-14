import { Clock, Pencil, SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { CategoryImage } from '@/entities/provision';
import { CloudAlert } from 'lucide-react';
import styles from './styles/ProvisionShortCard.module.css';

interface ProvisionShortCardProps {
  provisionId: number;
  title: string;
  price: number;
  time: number;
  categoryName?: string;
  categoryImage?: string;
  iconPurpose: 'profile' | 'detailes';
}

export function ProvisionShortCard({
  provisionId,
  title,
  price,
  time,
  categoryName = 'Service',
  categoryImage,
  iconPurpose,
}: ProvisionShortCardProps) {

  const iconClass = { size: 25, strokeWidth: 1.8 };

  return (
    <Link
      to={`/provisions/${provisionId}`}
      aria-label={`Open ${title}`}
      className={styles.cardLink}
    >
      <article className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            { categoryImage 
              ? <CategoryImage category={{ name: categoryName, image: categoryImage }} /> 
              : <CloudAlert size={26} />}
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
              {iconPurpose === 'profile' ? <SquareArrowOutUpRight {...iconClass} /> 
              : iconPurpose=== 'detailes' ? <Pencil {...iconClass} /> 
              : null} 
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
