import styles from './styles/CategoryList.module.css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CategorySelector } from '@/entities/provision';
import { categoryService } from '@/entities/provision/api/provisionApi';
import { provisionQueryKeys } from '@/entities/provision/api/provisionQueryKeys';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';

function CategoryList() {

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: provisionQueryKeys.categories,
    queryFn: categoryService.getAll,
  });

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  if (error) return <DefaultError text={`Error is: ${errorMessage} ${error.cause}`} />

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>
  }

  return (
    <section>
      <div className={styles.header}>
        <p className={styles.title}>
          Категории
        </p>
      </div>
      <CategorySelector
        categories={categories}
        name="category-filter"
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />
    </section>
  )
}

export default CategoryList
