import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectEvents } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllByAuthor } from './eventsSlice';

export default function EventsByAuthor(): JSX.Element {
    const events = useSelector(selectEvents);
    const dispatch = useAppDispatch();
    const { authorId } = useParams();

    useEffect(() => {
        dispatch(getAllByAuthor(Number(authorId)));
    }, [dispatch, authorId]);

    return (
        <>
            <div>Мероприятия автора</div>
            {
                authorId && (
                    <ul>
                        {
                            events?.map((element) => (
                                <li key={element.id}>
                                    <div>Название:{' '}
                                        <Link to={`../events/${element.id.toString()}`}>{element.title}</Link>
                                    </div>
                                    <div>Начало: {`${element.startAt}`}</div>
                                    <div>Окончание: {`${element.finishAt}`}</div>
                                    <div>Автор: {element.ownerId.toString()}</div>
                                    <div>Категория: {element.category}</div>
                                    <div>Локация: {element.place}</div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            <Link to="/events">К мероприятиям</Link>
        </>
    );
}
