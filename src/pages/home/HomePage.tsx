import CategoryList from '../../widgets/category-list';
import ProvisionCardList from '../../widgets/provision-list-home/ProvisionCardList';
import { Search, Funnel  } from 'lucide-react';
import { AccountGreet } from '../../entities/account';

function HomePage() {

  return (
    <div className="px-4 pt-4 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <AccountGreet />
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" width={18} height={18} />
        <input
          type="text"
          placeholder="Search for services..."
          className="w-full bg-bg-card-2 rounded-xl py-3 pl-10 pr-12 text-sm text-text-primary placeholder:text-text-muted outline-none"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
          <Funnel size={18} />
        </button>
      </div>
      
      <CategoryList />
      
      <ProvisionCardList />
    </div>
  )
}

export default HomePage
