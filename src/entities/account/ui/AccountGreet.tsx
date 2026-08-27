import DefaultError from "../../../shared/ui/DefaultError/DefaultError";
import { useUserStore } from "../store/userStore";

function AccountGreet() {
	const account = useUserStore((state) => state.user);

	if (!account) {
		return <DefaultError text="Something went wrong" />
	}

	const photoUrl = account.photoUrl ?? "/default-user.png";
	
    return (
			<div className='flex items-center gap-4'>
				<div>
					<img
						src={photoUrl}
						alt={account.firstName}
						className='w-12 h-12 rounded-full object-cover'
					/>
				</div>
				<span className='text-lg mx-13 font-bold'>
					<span className="text-accent">Hey,</span> {account.firstName} 👋
				</span>
			</div>
		)
}

export default AccountGreet;
