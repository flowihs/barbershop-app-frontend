import { Outlet } from 'react-router';
import BottomNav from '../shared/ui/Bottom-nav/BottomNav';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen pb-16 max-w-[430px] mx-auto w-full">
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
