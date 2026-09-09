
import type { Category } from '../../model/types';
import ListScroll from '@/shared/ui/ListScroll/ListScroll';
import { CategoryImage } from './CategoryImage';


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
            <CategoryImage category={category} />
            <span className="text-sm font-medium text-text-secondary transition-colors peer-checked:font-semibold peer-checked:text-accent">
              {category.name}
            </span>
          </label>
        );
      })}
    </ListScroll>
  );
}
