
import { useQuery } from '@tanstack/react-query';
import { accountService } from '../../entities/account/api/accountApi';
import { getUserId } from '../../features/stores/userSession';
import { getUserRole } from '../../features/stores/userSession';
import { ErrorHandlingMassage } from '../../shared/lib/api-error/apiErrorHandling';
import DefaultLoading from '../../shared/ui/DefaultLoading/DefaultLoading';
import Header from '../../widgets/profile/barber/Header';
import DefaultError from '../../shared/ui/DefaultError/DefaultError';

function ProfilePage() {

  const userId = getUserId();
  const userRole = getUserRole();

  const { data: account, isLoading, error } = useQuery({
    queryKey: ['account', 'me'],
    queryFn: () => accountService.getMeById(userId),
  });

  if (isLoading) {
    return (
      <DefaultLoading />
    )
  }

  if (error) return <DefaultError text={ErrorHandlingMassage(error)} />

  const role = account?.role;
  const photoUrl = account?.photoUrl;
  const name = 'Marcus "The Blade" Vane';
  const description = 'Curating confidence through precision cuts and traditional straight razor artistry since 2015.';
  const rating = 4.5;

  return (
		<div>
			{userRole === 'BARBER' && (
        <Header />
        <TextServicesList />
        <Footer />
      )}
      {userRole === 'CLIENT' && (
        <Header />
        <Body />
        <Footer />
      )}
		</div>
	)
}

export default ProfilePage;
