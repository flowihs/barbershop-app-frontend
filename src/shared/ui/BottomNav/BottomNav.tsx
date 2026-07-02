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
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-white/10 px-4 py-2">
      <div className="flex items-center justify-around max-w-[430px] mx-auto w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 ${
                isActive ? 'text-accent' : 'text-text-muted'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
