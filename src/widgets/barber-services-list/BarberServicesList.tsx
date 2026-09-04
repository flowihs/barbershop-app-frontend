import { useQuery } from '@tanstack/react-query';
import { Clock, Pencil } from 'lucide-react';
import { useUserStore } from '@/entities/account';
import { provisionService } from '@/entities/provision/api/provisionApi';
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

  return (
    <section className="mt-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-text-primary">
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
        <div className="space-y-2" aria-label="Loading services">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-17.25 animate-pulse rounded-xl bg-bg-slot"
            />
          ))}
        </div>
      ) : error ? (
        <DefaultError text="Failed to load services" />
      ) : provisions.length === 0 ? (
        <p className="py-6 text-center text-sm text-text-secondary">
          No services yet
        </p>
      ) : (
        <div className="space-y-2">
          {provisions.map((provision) => (
            <BarberServicesCard key={provision.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-text-primary">
                    {provision.title}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-1.5 text-text-secondary">
                    <Clock size={12} strokeWidth={1.8} />
                    <span className="text-xs uppercase">
                      {fallbackDuration} min
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <strong className="text-lg text-bg-textholder-area">
                    ${fallbackPrice}
                  </strong>
                  <button
                    type="button"
                    aria-label={`Edit ${provision.title}`}
                    className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border/5 bg-bg-primary text-text-secondary transition-colors hover:text-text-primary"
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
