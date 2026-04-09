import SeeAll from '../../shared/ui/SeeAllLink/SeeAll';
import { Sparkles, Scissors, UserRound, FingerprintPattern, GamepadDirectional } from 'lucide-react';
import ListScroll from '../../shared/ui/ListScroll/ListScroll';

interface Category {
  label: string
  icon: React.ReactNode
}

const CATEGORIES: Category[] = [
  {
    label: 'Hair Salon',
    icon: (
      <Scissors />
    ),
  },
  {
    label: 'Makeup',
    icon: (
      <Sparkles />
    ),
  },
  {
    label: 'Barber',
    icon: (
      <UserRound />
    ),
  },
  {
    label: 'Tattoo',
    icon: (
      <FingerprintPattern />
    ),
  },
  {
    label: 'Games',
    icon: (
      <GamepadDirectional />
    ),
  },
]

function CategoryList() {
  return (
    <section>
      <div className="flex justify-between my-4 px-2">
        <p className="text-xl text-text-primary">
          Categories
        </p>
        <div className='mt-1'>
          <SeeAll route="/" />
        </div>
      </div>
      <ListScroll>
        {CATEGORIES.map((category) => (
          <button
            key={category.label}
            className="flex flex-col items-center gap-2 min-w-[72px] overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-bg-card-2 flex items-center justify-center text-text-primary">
              {category.icon}
            </div>
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
              {category.label}
            </span>
          </button>
        ))}
      </ListScroll>
    </section>
  )
}

export default CategoryList
