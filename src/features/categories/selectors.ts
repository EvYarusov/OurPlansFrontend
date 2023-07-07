import { RootState } from '../../store';

export const selectCategories = (state: RootState): string[] => state.categories.categories;
export const selectError = (state: RootState): string | undefined => state.categories.error;
