import { RootState } from '../../store';
import User from '../users/types/User';
import Event from './types/Event';

export const selectEvents = (state: RootState): Event[] => state.events.events;
export const selectEvent = (state: RootState): Event | undefined => state.events.event;
export const selectError = (state: RootState): string | undefined => state.events.error;
export const selectMembers = (state: RootState): User[] => state.events.members;
