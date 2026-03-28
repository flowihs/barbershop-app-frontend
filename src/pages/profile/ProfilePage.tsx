import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { accountService } from '../../entities/account/api/accountApi';
import Header from '../../widgets/profile/Header';
import ActionsButton from '../../widgets/profile/ActionsButtons';
import './profile.less';

function ProfilePage() {
  const navigate = useNavigate();
  const tgWebAppData = useLaunchParams();

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['account', 'me'],
    queryFn: accountService.getMe,
  });
  // свою дату закинь если не так чтото
  const avatar = tgWebAppData.initData?.user?.photoUrl;
  const name = userData?.firstName || tgWebAppData.initData?.user?.firstName || 'no name';
  const description = userData?.description || 'no description';
  const rating = userData?.rating || 4.5;


  return (
		<div className='profile-page'>
			<Header
				avatar={avatar}
				name={name}
				description={description}
				rating={rating}
			/>

			<ActionsButton onSchedule={() => navigate('/schedule')} onEdit={() => navigate('/settings')} />
		</div>
	)
}

export default ProfilePage;
