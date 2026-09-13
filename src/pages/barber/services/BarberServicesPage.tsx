import styles from './BarberServicesPage.module.css';

import { useNavigate } from 'react-router';
import { BarberServicesCard } from '@/shared/ui/BarverServicesCard/Card';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { BarberServicesList } from '@/widgets/barber-services-list/BarberServicesList';

function BarberServicesPage() {

  const navigate = useNavigate();

  return (
    <section className={styles.page}>
      <HomePageButton onClick={() => navigate('/create')} text="Добавить услугу" />
      <div className={styles.stats}>
        <BarberServicesCard>
          <span className={styles.label}>
            Всего услуг
          </span>
          <strong className={styles.count}>
            5
          </strong>
        </BarberServicesCard>

        <BarberServicesCard>
          <span className={styles.placeholder}>
            Coming soon...
          </span>
        </BarberServicesCard>
      </div>

      <BarberServicesList />
    </section>
  );
}

export default BarberServicesPage;
