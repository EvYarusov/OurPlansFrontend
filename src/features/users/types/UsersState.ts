import User from './User';

export default interface UsersState {
    users: User[];
    user?: User;
    error?: string;
}
