import styles from './styles/CategorySelector.module.css';

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
            className={styles.category}
          >
            <input
              type="radio"
              name={name}
              value={category.id}
              checked={selectedCategoryId === category.id}
              defaultChecked={defaultCategoryId === category.id}
              onChange={() => onCategorySelect?.(category.id)}
              className={styles.input}
            />
            <CategoryImage category={category} />
            <span className={styles.label}>
              {category.name}
            </span>
          </label>
        );
      })}
    </ListScroll>
  );
}
