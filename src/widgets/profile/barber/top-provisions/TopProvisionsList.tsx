
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/entities/account';
import { provisionService } from '@/entities/provision/api/provisionApi';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import { ProvisionShortCard } from '@/widgets/provision-short-card/ProvisionShortCard';

const fallbackPrice = 45;
const fallbackTime = 20;

export function TopProvisionsList() {
  const profileId = useUserStore((state) => state.user?.id);

  const {
    data: provisions = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['provisions', 'top-five', profileId],
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
      <div className="px-4 py-5">
        <DefaultError text="Profile is not available" />
      </div>
    );
  }

  if (isPending) {
    return (
      <div
        className="divide-y divide-border/5 px-4"
        aria-label="Loading top services"
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="animate-pulse py-4">
            <div className="h-4 w-2/3 rounded bg-bg-secondary" />
            <div className="mt-2 h-3 w-16 rounded bg-bg-secondary" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-5">
        <DefaultError text="Failed to load top services" />
      </div>
    );
  }

  if (provisions.length === 0) {
    return (
      <p className="px-4 py-6 text-center text-sm text-text-secondary">
        No services yet
      </p>
    );
  }

  return (
    <div className="divide-y divide-border/5 px-4">
      {provisions.map((provision) => (
        <ProvisionShortCard
          key={provision.id}
          provisionId={provision.id}
          title={provision.title}
          price={fallbackPrice}
          time={fallbackTime}
        />
      ))}
    </div>
  );
}
