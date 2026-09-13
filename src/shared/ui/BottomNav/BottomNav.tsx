import styles from './BottomNav.module.css';
import { useLocation } from 'react-router';
import { House, Calendar, User } from 'lucide-react';
import { Link } from "react-router";

interface NavItem {
  id: number
  path: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    path: '/',
    label: 'Home',
    icon: (
      <House />
    ),
  },
  {
    id: 2,
    path: '/schedule',
    label: 'Schedule',
    icon: (
      <Calendar />
    ),
  },
  {
    id: 3,
    path: '/profile',
    label: 'Profile',
    icon: (
      <User />
    ),
  },
]

function BottomNav() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.items}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`${styles.link} ${isActive ? styles.active : styles.inactive}`}
            >
              {item.icon}
              <span className={styles.label}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
