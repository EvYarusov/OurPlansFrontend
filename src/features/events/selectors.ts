import { RootState } from '../../store';
import Event from './types/Event';

export const selectEvents = (state: RootState): Event[] => state.events.events;
export const selectError = (state: RootState): string | undefined =>
  state.events.error;
