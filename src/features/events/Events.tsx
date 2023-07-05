import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { selectEvents } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllEvents } from './eventsSlice';
import { selectUser } from '../auth/selectors';

export default function Events(): JSX.Element {
    const events = useSelector(selectEvents);
    const dispatch = useAppDispatch();
    const { eventId } = useParams();

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    const currentUser = useSelector(selectUser);

    return (
        <>
            <div>Мероприятия</div>
            {currentUser && currentUser.role === 'USER' && <Link to="add">Создать мероприятие</Link>}
            {
                eventId ? <Outlet /> : (
                    <ul>
                        {
                            events?.map((element) => (
                                <li key={element.id}>
                                    <div>Название:{' '}
                                        <Link to={element.id.toString()}>{element.title}</Link>
                                    </div>
                                    <div>Начало: {`${element.startAt}`}</div>
                                    <div>Окончание: {`${element.finishAt}`}</div>
                                    {currentUser && (currentUser.role === 'USER' || 'ADMIN') && (
                                        <div>Автор:{' '}
                                            {/* добавить на бэке имя автора
                                            только админ может всех юзеров получить */}
                                            <Link to={`author/${element.ownerId}`}>{element.ownerId}</Link>
                                        </div>
                                    )}
                                    <div>Категория: {element.category}</div>
                                    <div>Локация: {element.place}</div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    );
}
