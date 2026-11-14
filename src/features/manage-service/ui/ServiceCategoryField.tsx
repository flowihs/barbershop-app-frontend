import { CategorySelector } from '@/entities/provision';
import { useCategories } from '@/entities/provision/model/useCategories';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import styles from './styles/ServiceCategoryField.module.css';

interface ServiceCategoryFieldProps {
  categoryId?: number;
}

export function ServiceCategoryField({ categoryId }: ServiceCategoryFieldProps) {
  const { categories, isLoading, isFetching, error, refetch } = useCategories();

  return (
    <fieldset>
      <legend className={styles.legend}>Категория</legend>
      {isLoading ? (
        <div className={styles.skeleton} role="status" aria-label="Загрузка категорий" />
      ) : error && categories.length === 0 ? (
        <div className={styles.error} role="alert">
          <DefaultError text="Не удалось загрузить категории" />
          <button type="button" className={styles.retry} disabled={isFetching} onClick={() => void refetch()}>
            {isFetching ? 'Загрузка...' : 'Повторить'}
          </button>
        </div>
      ) : categories.length === 0 ? (
        <p className={styles.empty}>Категории пока не добавлены</p>
      ) : (
        <CategorySelector
          categories={categories}
          name="categoryId"
          defaultCategoryId={categoryId}
          required
        />
      )}
    </fieldset>
  );
}
