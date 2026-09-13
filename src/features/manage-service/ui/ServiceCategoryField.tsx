import styles from './ServiceCategoryField.module.css';
import { useQuery } from '@tanstack/react-query';
import { CategorySelector } from '@/entities/provision';
import { categoryService } from '@/entities/provision/api/provisionApi';
import { provisionQueryKeys } from '@/entities/provision/api/provisionQueryKeys';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';

interface ServiceCategoryFieldProps {
  categoryId?: number;
}

export function ServiceCategoryField({
  categoryId,
}: ServiceCategoryFieldProps) {
  const {
    data: categories = [],
    isPending,
    error,
  } = useQuery({
    queryKey: provisionQueryKeys.categories,
    queryFn: categoryService.getAll,
    staleTime: 1000 * 60 * 60 * 24 * 3 //3 days
  });

  return (
    <fieldset>
      <legend className={styles.legend}>
        Категория
      </legend>

      {isPending ? (
        <div className={styles.skeleton} />
      ) : error ? (
        <DefaultError text="Не удалось загрузить категории" />
      ) : (
        <CategorySelector
          categories={categories}
          name="categoryId"
          defaultCategoryId={categoryId}
        />
      )}
    </fieldset>
  );
}
