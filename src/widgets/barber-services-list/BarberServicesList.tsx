import styles from './styles/BarberServicesList.module.css';
import { useQuery } from '@tanstack/react-query';
import { Clock, Pencil } from 'lucide-react';
import { useUserStore } from '@/entities/account';
import { provisionService } from '@/entities/provision/api/provisionApi';
import { provisionQueryKeys } from '@/entities/provision/api/provisionQueryKeys';
import { BarberServicesCard } from '@/shared/ui/BarverServicesCard/Card';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';

const fallbackPrice = 45;
const fallbackDuration = 20;

export function BarberServicesList() {
  const profileId = useUserStore((state) => state.user?.id);

  const {
    data: provisions = [],
    isPending,
    error,
  } = useQuery({
    queryKey: provisionQueryKeys.topFive(profileId),
    queryFn: () => {
      if (!profileId) {
        throw new Error('Profile is not available');
      }

      return provisionService.getTopProvisions(profileId);
    },
    enabled: Boolean(profileId),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Список услуг
        </h2>
        <ProfilePageDefaultButton
          variant="compact"
          ariaLabel="Sort services"
        >
          Сортировать
        </ProfilePageDefaultButton>
      </div>

      {!profileId ? (
        <DefaultError text="Profile is not available" />
      ) : isPending ? (
        <div className={styles.list} aria-label="Loading services">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={styles.skeleton}
            />
          ))}
        </div>
      ) : error ? (
        <DefaultError text="Failed to load services" />
      ) : provisions.length === 0 ? (
        <p className={styles.empty}>
          No services yet
        </p>
      ) : (
        <div className={styles.list}>
          {provisions.map((provision) => (
            <BarberServicesCard key={provision.id}>
              <div className={styles.row}>
                <div className={styles.content}>
                  <h3 className={styles.serviceTitle}>
                    {provision.title}
                  </h3>

                  <div className={styles.duration}>
                    <Clock size={12} strokeWidth={1.8} />
                    <span className={styles.durationText}>
                      {fallbackDuration} min
                    </span>
                  </div>
                </div>

                <div className={styles.actions}>
                  <strong className={styles.price}>
                    ${fallbackPrice}
                  </strong>
                  <button
                    type="button"
                    aria-label={`Edit ${provision.title}`}
                    className={styles.editButton}
                  >
                    <Pencil size={13} strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </BarberServicesCard>
          ))}
        </div>
      )}
    </section>
  );
}
