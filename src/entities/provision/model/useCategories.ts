import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../api/provisionApi';
import { provisionQueryKeys } from '../api/provisionQueryKeys';
import { useCategoriesStore } from '../store/categoryStore';

export function useCategories() {

  const storedCategories = useCategoriesStore((state) => state.categories);
  const isLoaded = useCategoriesStore((state) => state.isLoaded);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const setError = useCategoriesStore((state) => state.setError);
  
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: provisionQueryKeys.categories,
    queryFn: categoryService.getAll,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data !== undefined) setCategories(data);
    setError(error);
  }, [data, error, setCategories, setError]);

  return {
    categories: data ?? storedCategories,
    isLoading: isPending && !isLoaded,
    isFetching,
    error,
    refetch,
  };
}
