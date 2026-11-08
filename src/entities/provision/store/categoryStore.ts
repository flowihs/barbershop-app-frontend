import { create } from 'zustand';
import type { Category } from '../model/types';

interface CategoriesStore {
  categories: Category[];
  isLoaded: boolean;
  error: Error | null;
  setCategories: (categories: Category[]) => void;
  setError: (error: Error | null) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  isLoaded: false,
  error: null,
  setError: (error) => set({ error }),
  setCategories: (categories) => set({ categories, isLoaded: true, error: null }),
}));
