import { Outlet, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import BottomNav from '../shared/ui/BottomNav/BottomNav';
import Logo from '../shared/ui/Logo/Logo';

const pageTitles: Record<string, string> = {
  '/': '',
  '/schedule': 'Schedule',
  '/profile': 'Profile',
}

function Layout() {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname];
  const isHomePage = location.pathname === '/';

  return (
		<div className='flex flex-col min-h-screen pb-16 max-w-[430px] mx-auto w-full bg-bg-primary'>
			<header className='px-4 pt-4 pb-2 flex justify-between items-center  border-b border-[#33383D]'>
				<div className='flex items-center gap-3'>
					{!isHomePage && (
						<Link to='/' className='text-text-primary'>
							<ArrowLeft size={24} />
						</Link>
					)}
					{isHomePage ? (
						<Logo />
					) : (
						<h1 className='text-xl font-semibold text-text-primary'>
							{currentTitle}
						</h1>
					)}
				</div>

				<div className='flex items-center gap-5'>
					<button className='text-text-secondary'>
						<Bell />
					</button>
					<button className='text-text-secondary'>
						<Settings />
					</button>
				</div>
			</header>

			<main className='flex-1'>
				<Outlet />
			</main>

			<BottomNav />
		</div>
	)
}

export default Layout