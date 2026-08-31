import { HeaderBarberSide } from '../../widgets/profile/barber';

function ProfilePage() {
  return (
    <div className="bg-bg-primary">
      <HeaderBarberSide />
      <div className='flex flex-row justify-end'>
        <span className='text-text-primary text-lg font-semibold'>
          Top services
        </span>
        
      </div>
    </div>
  );
}

export default ProfilePage;
