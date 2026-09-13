import { HeaderBarberSide } from '../../widgets/profile/barber';
import { TopProvisionsList } from '@/widgets/profile/barber/top-provisions/TopProvisionsList';
import { useNavigate } from 'react-router';
import styles from './styles/ProfilePage.module.css';

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <HeaderBarberSide />
      <section className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <h2 className={styles.servicesTitle}>Top services</h2>
          <button
            type="button"
            onClick={() => navigate('/barber-services')}
            aria-label="View all services"
            className={styles.viewAll}
          >
            View all
          </button>
        </div>
        <TopProvisionsList />
      </section>
    </div>
  );
}

export default ProfilePage;
