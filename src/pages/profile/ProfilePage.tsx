import { HeaderBarberSide } from '../../widgets/profile/barber';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';
import { TopProvisionsList } from '@/widgets/profile/barber/top-provisions/TopProvisionsList';

function ProfilePage() {
  return (
    <div className="bg-bg-primary">
      <HeaderBarberSide />
      <section className="border-t border-border/5 pb-6">
        <div className="flex w-full items-center justify-between px-4 pb-1 pt-4">
          <h2 className="text-base font-bold text-text-primary">
            Top services
          </h2>
          <ProfilePageDefaultButton
            onClick={() => {}}
            variant="compact"
            ariaLabel="View all services"
          >
            View all
          </ProfilePageDefaultButton>
        </div>
        <TopProvisionsList />
      </section>
    </div>
  );
}

export default ProfilePage;
