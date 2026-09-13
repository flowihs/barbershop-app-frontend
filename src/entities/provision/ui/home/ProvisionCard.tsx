import styles from './styles/ProvisionCard.module.css';
import type { ProvisionRequest } from '../../model/types';
import { MoveRight, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

function ProvisionCard({ provision }: { provision: ProvisionRequest }) {

  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.imageFrame}  >
        <img
          src={provision.avatar}
          alt={provision.title}
          className={styles.image}
        />
        <div className={styles.badges}>
          <button className={styles.locationButton}>
            <MapPin size={15} color='white'/>
          </button>
          <div className={styles.rating}>
            <Star size={15} className={styles.star} />
            {/* <p>{provision.reviews.rating}</p> */}
            <p className={styles.ratingValue}>5.0</p>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.summary}>
            <div className={styles.content}>
              <h3 className={styles.title}>
                {provision.title}
              </h3>
              <p className={styles.category}>
                {provision.provisionCategory.name}
              </p>
            </div>

            <button
              onClick={() => navigate(`/provisions/${provision.id}`)}
              className={styles.openButton}
            >
              <MoveRight width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProvisionCard;
