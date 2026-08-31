import DefaultError from "../../../shared/ui/DefaultError/DefaultError";
import { Avatar } from "../../../shared/ui/Avatar/Avatar";
import { useUserStore } from "../store/userStore";

function AccountGreet() {
	const account = useUserStore((state) => state.user);

	if (!account) {
		return <DefaultError text="Something went wrong" />
	}

    return (
			<div className='flex items-center gap-4'>
				<div>
					<Avatar photo={account.photoUrl} alt={account.firstName} />
				</div>
				<span className='text-lg mx-13 font-bold'>
					<span className="text-accent">Hey,</span> {account.firstName} 👋
				</span>
			</div>
		)
}

export default AccountGreet;
