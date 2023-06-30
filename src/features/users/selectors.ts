import { RootState } from '../../store';
import User from './types/User';

export const selectUsers = (state: RootState): User[] => state.users.users;
export const selectUser = (state: RootState): User | undefined => state.users.user;
export const selectError = (state: RootState): string | undefined => state.users.error;
