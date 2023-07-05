import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { selectUser } from './selectors';
import { getUser } from './authSlice';
import { getAllMyEvents } from '../events/eventsSlice';
import { selectEvents } from '../events/selectors';

export default function Profile(): JSX.Element {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const currentUser = useSelector(selectUser);
    const events = useSelector(selectEvents);
    const [flagMyEvents, setFlagMyEvents] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [flagEventsWithMe, setFlagEventsWithMe] = useState(false);

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAllMyEvents());
    }, [dispatch]);

    return (
        <div>
            <div>Личный кабинет</div>
            {user && (
                <div>
                    <div>Ник: {user?.userName}</div>
                    <div>Полное имя: {user?.full_name}</div>
                    <div>Возраст: {user?.age}</div>
                    <div>Пол: {user?.gender}</div>
                    <div>Роль: {user?.role}</div>
                    <div>Почта: {user?.email}</div>
                    {user && user.role !== 'ADMIN' && (<div>Блокировка: {`${user?.blocked}`}</div>)}
                </div>
            )}
            {currentUser && currentUser.role === 'USER' &&
                <Link className="btn btn-light btn-lg" to="../events/add">Создать мероприятие</Link>}
            <button
              className="btn btn-light btn-lg"
              type="button"
              onClick={() => {
                    setFlagMyEvents(true);
                    setFlagEventsWithMe(false);
                }}
            >
                Мероприятия где я автор
            </button>
            <button
              className="btn btn-light btn-lg"
              type="button"
              onClick={() => {
                    setFlagEventsWithMe(true);
                    setFlagMyEvents(false);
                }}
            >
                Мероприятия где я участник
            </button>
            {events && (
                <ul>
                    {
                        flagMyEvents &&
                        events?.filter((el) => el.ownerId === currentUser?.id).map((element) => (
                            <li key={element.id}>
                                <div>Название:{' '}
                                    <Link to={`../events/${element.id.toString()}`}>{element.title}</Link>
                                </div>
                                <div>Начало: {`${element.startAt}`}</div>
                                <div>Окончание: {`${element.finishAt}`}</div>
                                <div>Категория: {element.category}</div>
                                <div>Локация: {element.place}</div>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
}
