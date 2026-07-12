// import { useQuery } from "@tanstack/react-query";
// import { accountService } from "../../../entities/account/api/accountApi";
// import { getUserId } from "../../../shared/lib/store/userSession";
import { useState } from "react";
// import { ErrorHandlingMassage } from "../../../shared/lib/api-error/apiErrorHandling";
import { Check } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Socials } from "../socials-list/SocialsList";
// import DefaultError from "../../../shared/ui/DefaultError/DefaultError";
// import DefaultLoading from "../../../shared/ui/DefaultLoading/DefaultLoading";

function HeaderBarberSide() {

	const [name, setName] = useState<string>('Marcus "The Blade" Vane');
	const [desc, setDesc] = useState<string>('Curating confidence through precision cuts and traditional straight razor artistry since 2015.');
	const [hasChangedName, setHasChangedName] = useState<boolean>(false);
	const [hasChangedDesc, setHasChangedDesc] = useState<boolean>(false);

	// const userId = getUserId();
	// const rating = 4.5;
	const MAX_NAME_WORDS = 50;
	const MAX_DESC_WORDS = 400;

	// const { data: account, isLoading, error } = useQuery({
	// 	queryKey: ['account', 'me'],
	// 	queryFn: () => accountService.getMeById(userId),
	// });

	// if (isLoading) return <DefaultLoading />

	// if (error) return <DefaultError text={ErrorHandlingMassage(error)} />

	const photoUrl = "/default-user.png";

	return (
		<div className='flex flex-col items-center mx-auto'>
			<div className='mt-5'>
				<img
					src={photoUrl}
					className='w-24 h-24 rounded-full object-cover ring-white'
				/>
			</div>
			<div>
				<input
					type='file'
					accept="image/png, image/gif, image/jpeg"
					className='w-7 h-7 rounded-full bg-white items-center'
				>
					<Plus size={16} className='text-black shadow-lg'/>
				</input>
			</div>
			<div className='mt-6 space-y-4'>
				<form className='border-bg-textholder-area/30 border'>
					<textarea
						rows={1}
						className='resize-none text-text-primary rounded-lg px-4 py-3 text-lg font-bold'
						placeholder='Write your name :)'
						value={name}
						onChange={(e) => { 
							if (e.target.value.length < MAX_NAME_WORDS) {
								setName(e.target.value)
								setHasChangedName(true)
							}
						}}
						>
					</textarea>
					{hasChangedName && (
						<button type='submit' className='bg-white py-2 px-4 items-center rounded-full mt-3'>
							<Check size={16} className='text-black mr-2' />
						</button>
					)}
				</form>
				<form className='border-bg-textholder-area/30 border'>
					<textarea
						rows={5}
						className='resize-none rounded-lg text-text-muted text-sm px-4 py-2'
						placeholder='Write your description :)'
						value={desc}
						onChange={(e) => {
							if (e.target.value.length < MAX_DESC_WORDS) {
								setDesc(e.target.value)
								setHasChangedDesc(true)
							}
						}}
					>
					</textarea>
					{hasChangedDesc && (
						<button type='submit' className='bg-white py-2 px-4 items-center font-semibold rounded-full mt-3'>
							<Check size={16} className='text-black mr-2' />
						</button>
					)}
				</form>
			</div>
			<Socials />
		</div>
	)
}

export { HeaderBarberSide };
