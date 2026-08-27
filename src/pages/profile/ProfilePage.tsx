
// import { getUserRole } from '../../shared/lib/store/userSession';
// import { HeaderBarberSide } from '../../widgets/profile/barber/header/Header';

function ProfilePage() {

  // const userRole = getUserRole();

  return (
		<div className='flex flex-col justify-center'>
         {/* <HeaderBarberSide /> */}
         <div className='flex flex-row justify-end'>
            <span className='font-bold'>Top services</span>
            <button className='border-bg-textholder-area/30 border rounded-lg bg-black/0 shadow-lg'>
               <div className='text-bg-textholder-area font-bold'>
                  View All 
               </div>
            </button>
         </div>
         
		</div>
	)
}

export default ProfilePage;
