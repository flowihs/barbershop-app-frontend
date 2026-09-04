

import { BarberServicesCard } from '@/shared/ui/BarverServicesCard/Card';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { BarberServicesList } from '@/widgets/barber-services-list/BarberServicesList';

function BarberServicesPage() {
  return (
    <section className="px-3 py-4">
      <HomePageButton text="Добавить услугу" />
      <div className="mt-2.5 flex gap-2">
        <BarberServicesCard>
          <span className="text-[8px] font-semibold uppercase tracking-wide text-text-secondary">
            Всего услуг
          </span>
          <strong className="mt-1 text-base leading-none text-text-primary">
            5
          </strong>
        </BarberServicesCard>

        <BarberServicesCard>
          <span className="mt-1 animate-pulse text-xs font-semibold leading-none text-text-primary">
            Coming soon...
          </span>
        </BarberServicesCard>
      </div>

      <BarberServicesList />
    </section>
  );
}

export default BarberServicesPage;
