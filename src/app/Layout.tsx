import styles from './Layout.module.css';
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
		<div className={styles.page}>
			<header className={styles.header}>
				<div className={styles.brand}>
					{!isHomePage && (
						<Link to='..' onClick={() => navigate(-1)} className={styles.backLink}>
							<ArrowLeft size={24} />
						</Link>
					)}
					{isHomePage ? (
						<Logo />
					) : (
						<h1 className={styles.title}>
							{currentTitle}
						</h1>
					)}
				</div>

				<div className={styles.actions}>
					<button className={styles.actionButton}>
						<Bell className={styles.actionIcon} />
					</button>
					<button className={styles.actionButton}>
						<Settings className={styles.actionIcon} />
					</button>
				</div>
			</header>

			<main className={styles.main}>
				<Outlet />
			</main>

			<BottomNav />
			<SocialLinksModal />
		</div>
	)
}

export default Layout
