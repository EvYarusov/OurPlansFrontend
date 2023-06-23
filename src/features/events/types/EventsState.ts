import Event from './Event';

export default interface EventsState {
    events: Event[];
    error?: string;
}
