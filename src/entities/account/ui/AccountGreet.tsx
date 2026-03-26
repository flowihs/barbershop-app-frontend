import { useLaunchParams } from "@telegram-apps/sdk-react";

function AccountGreet() {

    const tgWebAppData = useLaunchParams();

    const firstName = tgWebAppData.initData?.user?.firstName;
    const photoUrl = tgWebAppData.initData?.user?.photoUrl;

    return (
			<div className='flex items-center gap-3 '>
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
					<span className='text-lg font-semibold'>Hey, {firstName}</span>
				) : (
					<span className='text-lg font-semibold'>Hey, Stranger</span>
				)}
			</div>
		)
}

export default AccountGreet;
