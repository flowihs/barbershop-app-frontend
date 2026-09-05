import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import BottomNav from '../shared/ui/BottomNav/BottomNav';
import Logo from '../shared/ui/Logo/Logo';
import { SocialLinksModal } from '../features/social-links';

const pageTitles: Record<string, string> = {
  '/': '',
  '/schedule': 'Schedule',
  '/profile': 'Profile',
  '/barber-services': 'Services',
}

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTitle = pageTitles[location.pathname];
  const isHomePage = location.pathname === '/';

  return (
		<div className='flex flex-col min-h-screen pb-16 max-w-107.5 mx-auto w-full bg-bg-primary'>
			<header className='px-4 pt-4 pb-4 flex justify-between items-center  border-b border-[#33383D]'>
				<div className='flex items-center gap-3'>
					{!isHomePage && (
						<Link to='..' onClick={() => navigate(-1)} className='text-text-primary'>
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
						<Bell className="cursor-pointer" />
					</button>
					<button className='text-text-secondary'>
						<Settings className="cursor-pointer" />
					</button>
				</div>
			</header>

			<main className='flex-1'>
				<Outlet />
			</main>

			<BottomNav />
			<SocialLinksModal />
		</div>
	)
}

export default Layout
