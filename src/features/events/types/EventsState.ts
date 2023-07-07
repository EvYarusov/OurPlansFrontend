import User from '../../users/types/User';
import Event from './Event';

export default interface EventsState {
    events: Event[];
    event?: Event;
    error?: string;
    members: User[];
}
