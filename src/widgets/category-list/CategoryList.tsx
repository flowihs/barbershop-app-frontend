import { useState } from 'react';
import { CategorySelector } from '@/entities/provision';
import { useCategories } from '@/entities/provision/model/useCategories';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import styles from './styles/CategoryList.module.css';

function CategoryList() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const { categories, isLoading, isFetching, error, refetch } = useCategories();

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error && categories.length === 0) {
    return (
      <div className={styles.error} role="alert">
        <DefaultError text="Не удалось загрузить категории" />
        <button type="button" className={styles.retry} disabled={isFetching} onClick={() => void refetch()}>
          {isFetching ? 'Загрузка...' : 'Повторить'}
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className={styles.header}>
        <p className={styles.title}>Категории</p>
      </div>
      {categories.length === 0 ? (
        <p className={styles.loading}>Категории пока не добавлены</p>
      ) : (
        <CategorySelector
          categories={categories}
          name="category-filter"
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
      )}
    </section>
  );
}

export default CategoryList;
