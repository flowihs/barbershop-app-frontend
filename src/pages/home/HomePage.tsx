import CategoryList from '../../widgets/category-list';
import ProvisionCardList from '../../widgets/barber-list';
import { Bell, Settings } from 'lucide-react';
import { UserGreet } from '../../entities/user';

function HomePage() {
  return (
    <div className="px-4 pt-4 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <UserGreet />
        <div className="flex items-center gap-5">
          <button className="text-text-secondary">
            <Bell />
          </button>
          <button className="text-text-secondary">
            <Settings />
          </button>
        </div>
      </header>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search for services..."
          className="w-full bg-bg-secondary rounded-xl py-3 pl-10 pr-12 text-sm text-text-primary placeholder:text-text-muted outline-none"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>
      </div>

      <CategoryList />
      <ProvisionCardList />
    </div>
  )
}

export default HomePage
