import CategoryList from '../../widgets/category-list';
import ProvisionCardList from '../../widgets/barber-list';
import { Bell, Settings, Search, SlidersHorizontal } from 'lucide-react';
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" width={18} height={18} />
        <input
          type="text"
          placeholder="Search for services..."
          className="w-full bg-bg-secondary rounded-xl py-3 pl-10 pr-12 text-sm text-text-primary placeholder:text-text-muted outline-none"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
          <SlidersHorizontal width={18} height={18} />
        </button>
      </div>

      <CategoryList />
      <ProvisionCardList />
    </div>
  )
}

export default HomePage
