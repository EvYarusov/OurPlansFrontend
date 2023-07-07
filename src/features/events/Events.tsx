import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { selectEvents } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllEvents } from './eventsSlice';
import { selectUser } from '../auth/selectors';
import style from './Events.module.css';

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
            <div className={style.topBtn}>
                {currentUser && currentUser.role === 'USER' &&
                    <Link className={style.topBtnEl} to="add">Создать мероприятие</Link>}
            </div>
            {
                eventId ? <Outlet /> : (
                    <ul className={style.eventsList}>
                        {
                            events?.map((element) => (
                                <li key={element.id} className={style.eventCard}>
                                    <div className={style.eventPoint}>Название:{' '}
                                        <Link className="grey" to={element.id.toString()}>{element.title}</Link>
                                    </div>
                                    <div className={style.eventPoint}>
                                        Категория: {element.category}
                                    </div>
                                    <div className={style.eventPoint}>Локация: {element.place}</div>
                                    <div className={style.eventPoint}>Начало: {`${element.startAt}`}</div>
                                    <div className={style.eventPoint}>Окончание: {`${element.finishAt}`}</div>
                                    {currentUser && (currentUser.role === 'USER' || 'ADMIN') && (
                                        <>
                                            <div className={style.eventPoint}>
                                                <Link className="grey" to={`../../users/${element?.ownerId.toString()}`}>
                                                    Автор
                                                </Link>
                                            </div>
                                            {/* добавить на бэке имя автора
                                            только админ может всех юзеров получить */}
                                            <div className={style.eventPointLink}>
                                                <Link className={style.authorEvents} to={`author/${element.ownerId}`}>
                                                    Все мероприятия автора
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    );
}
