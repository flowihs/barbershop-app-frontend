
import type { Category } from '../../model/types';
import ListScroll from '@/shared/ui/ListScroll/ListScroll';


interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId?: number;
  name: string;
  defaultCategoryId?: number;
  onCategorySelect?: (categoryId: number) => void;
}

export function CategorySelector({
  categories,
  name,
  selectedCategoryId,
  defaultCategoryId,
  onCategorySelect,
}: CategorySelectorProps) {

  return (
    <ListScroll>
      {categories.map((category) => {

        return (
          <label
            key={category.id}
            className="flex min-w-14 cursor-pointer flex-col items-center gap-2"
          >
            <input
              type="radio"
              name={name}
              value={category.id}
              checked={selectedCategoryId === category.id}
              defaultChecked={defaultCategoryId === category.id}
              onChange={() => onCategorySelect?.(category.id)}
              className="peer sr-only"
            />
            <img 
              src={category.image ?? 'public/images/warning.png'}
              className="w-14 h-14 rounded-2xl bg-bg-card-2 flex items-center justify-center text-text-primary">
            </img>
            <span className="text-sm font-medium text-text-secondary transition-colors peer-checked:font-semibold peer-checked:text-accent">
              {category.name}
            </span>
          </label>
        );
      })}
    </ListScroll>
  );
}
