import { HeaderBarberSide } from '../../widgets/profile/barber';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';
import { TopProvisionsList } from '@/widgets/profile/barber/top-provisions/TopProvisionsList';
import { useNavigate } from 'react-router';

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-primary">
      <HeaderBarberSide />
      <section className="border-t border-border/5 pb-6">
        <div className="flex w-full items-center justify-between px-4 pb-1 pt-4">
          <h2 className="text-base font-bold text-text-primary">
            Top services
          </h2>
          <ProfilePageDefaultButton
            onClick={() => navigate('/barber-services')}
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
