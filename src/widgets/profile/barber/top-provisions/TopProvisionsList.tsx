import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/entities/account';
import { provisionService } from '@/entities/provision/api/provisionApi';
import { provisionQueryKeys } from '@/entities/provision/api/provisionQueryKeys';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import { ProvisionShortCard } from '@/widgets/provision-short-card/ProvisionShortCard';
import styles from "./style.module.css";

const fallbackPrice = 45;
const fallbackTime = 20;

export function TopProvisionsList() {
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

  if (!profileId) {
    return (
      <div className={styles.stateMessage}>
        <DefaultError text="Profile is not available" />
      </div>
    );
  }

  if (isPending) {
    return (
      <div
        className={styles.loadingList}
        aria-label="Loading top services"
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className={styles.loadingItem}>
            <div className={styles.loadingTitle} />
            <div className={styles.loadingMeta} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateMessage}>
        <DefaultError text="Failed to load top services" />
      </div>
    );
  }

  if (provisions.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        No services yet
      </p>
    );
  }

  return (
    <div className={styles.provisionListProfile}>
      {provisions.map((provision) => (
        <ProvisionShortCard
          key={provision.id}
          provisionId={provision.id}
          title={provision.title}
          price={fallbackPrice}
          time={fallbackTime}
          categoryName={provision.provisionCategory?.name}
          categoryImage={provision.provisionCategory?.image}
        />
      ))}
    </div>
  );
}
