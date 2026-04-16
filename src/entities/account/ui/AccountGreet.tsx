import { useTelegramUser } from "../../../shared/hooks/useTelegramUser";

function AccountGreet() {

    const user = useTelegramUser();

	const photoUrl = user?.photoUrl;
	const firstName = user?.firstName;

    return (
			<div className='flex items-center gap-4'>
				{photoUrl ? (
					<img
						src={photoUrl}
						alt={firstName}
						className='w-12 h-12 rounded-full object-cover'
					/>
				) : (
					<div className='w-12 h-12 rounded-full bg-bg-secondary' />
				)}
				{firstName ? (
					<span className='text-lg text-text-primary mx-20'>Hey, {firstName} 👋</span>
				) : (
					<span className='text-lg font-semibold mx-20'>Hey, Stranger</span>
				)}
			</div>
		)
}

export default AccountGreet;
