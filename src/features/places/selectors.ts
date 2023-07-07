import { RootState } from '../../store';

export const selectPlaces = (state: RootState): string[] => state.places.places;
export const selectError = (state: RootState): string | undefined => state.places.error;
