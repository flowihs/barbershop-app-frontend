import { useTelegramUser } from "../../../shared/hooks/useTelegramUser";
import DefaultError from "../../../shared/ui/DefaultError/DefaultError";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "../api/accountApi";

function AccountGreet() {

	const { data: account, isLoading, error } = useQuery({
		queryKey: ['account', 'me'],
		queryFn: accountService.getMe,
	});

    const TelegramUser = useTelegramUser();	

	const firstName = account?.firstName;
	const photoUrl = TelegramUser?.photoUrl;
	
	const errorMessage = error instanceof Error ? error.message : 'Unknown error';
	if (error) return <DefaultError text={`Failed to load user data: ${errorMessage}`} />;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-4">
				<p className='text-center text-text-secondary text-sm p-4'>
				Loading...
				</p>
			</div>
		)
  	}
	
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
					<span className='text-lg text-text-primary mx-13'>Hey, {firstName} 👋</span>
				) : (
					<span className='text-lg font-semibold mx-20'>Hey, Stranger</span>
				)}
			</div>
		)
}

export default AccountGreet;
