import DefaultLoading from "../../../shared/ui/DefaultLoading/DefaultLoading";
import DefaultError from "../../../shared/ui/DefaultError/DefaultError";
import { setUserId } from "../../../shared/lib/store/userSession";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "../api/accountApi";
import { ErrorHandlingMassage } from "../../../shared/lib/api-error/apiErrorHandling";

function AccountGreet() {

	const { data: account, isLoading, error } = useQuery({
		queryKey: ['account', 'me'],
		queryFn: accountService.getMe,
	});

	const id = account?.id; 
	
	if (!id) { 
		const error = new Error("Something went wrong");
		return <DefaultError text={ErrorHandlingMassage(error)} />
	}

	const firstName = account?.firstName;
	const photoUrl = account?.photoUrl ?? "public/default-user.png";

	setUserId(id);

	if (isLoading) {
		return (
			<DefaultLoading />
		)
  	}

	if (error) return <DefaultError text={ErrorHandlingMassage(error)} />;
	
    return (
			<div className='flex items-center gap-4'>
				<div>
					<img
						src={photoUrl}
						className='w-12 h-12 rounded-full object-cover'
					/>
				</div>
				<span className='text-lg text-text-primary mx-13'>Hey, {firstName} 👋</span>
			</div>
		)
}

export default AccountGreet;
