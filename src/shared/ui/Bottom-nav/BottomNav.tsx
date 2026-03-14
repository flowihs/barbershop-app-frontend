import { useLocation, useNavigate } from 'react-router'
import { House, Calendar, User } from 'lucide-react';

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <House />
    ),
  },
  {
    path: '/booking',
    label: 'Schedule',
    icon: (
      <Calendar />
    ),
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (
      <User />
    ),
  },
]

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-white/10 px-4 py-2">
      <div className="flex items-center justify-around max-w-[430px] mx-auto w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 py-1 ${
                isActive ? 'text-accent' : 'text-text-muted'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
