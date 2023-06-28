import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectEvents } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllEvents, deleteEvent } from './eventsSlice';

export default function Events(): JSX.Element {
    const events = useSelector(selectEvents);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);
    return (
        <>
            <div>Events</div>
            {events.map((event) => (
                <div key={event.id}>
                    <div>{event.id}</div>
                    <div>{event.title}</div>
                    <div>{event.description}</div>
                    <div>{event.start_at.getDate.arguments}</div>
                    <div>{event.start_at.getTime.arguments}</div>
                    <div>{event.finish_at.getDate.arguments}</div>
                    <div>{event.finish_at.getTime.arguments}</div>
                    <div>{event.place}</div>
                    <div>{event.category}</div>
                    <div>{event.author_id}</div>
                    <button
                      type="button"
                      onClick={() => dispatch(deleteEvent(event.id))}
                    >Delete
                    </button>
                </div>
            )
            )}
        </>
    );
}
