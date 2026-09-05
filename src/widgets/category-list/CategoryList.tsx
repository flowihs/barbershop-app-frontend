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
    return <p className='text-text-secondary text-sm p-4'>Loading...</p>
  }

  return (
    <section>
      <div className="flex justify-between my-4 px-2">
        <p className="text-xl pb-3 text-text-primary">
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
