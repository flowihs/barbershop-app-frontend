import SeeAll from '../../shared/ui/SeeAllLink/SeeAll';
import { Sparkles, Scissors, UserRound, FingerprintPattern } from 'lucide-react';

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
    label: 'Nail Salon',
    icon: (
      <FingerprintPattern />
    ),
  },
]

function CategoryList() {
  return (
    <section>
      <SeeAll route="/" />
      <div className="flex gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.label}
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-bg-secondary flex items-center justify-center text-text-primary">
              {category.icon}
            </div>
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategoryList
