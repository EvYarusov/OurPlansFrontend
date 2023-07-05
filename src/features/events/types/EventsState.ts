import Event from './Event';

export default interface EventsState {
    events: Event[];
    event?: Event;
    error?: string;

}
