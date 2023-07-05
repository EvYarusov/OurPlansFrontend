import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectEvent } from './selectors';
import { useAppDispatch } from '../../store';
import { getEventById } from './eventsSlice';
import { selectUser } from '../auth/selectors';

export default function EventPage(): JSX.Element {
  const event = useSelector(selectEvent);
  const dispatch = useAppDispatch();
  const { eventId } = useParams();

  const currentUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(getEventById(Number(eventId)));
  }, [dispatch, eventId]);

  return (
    <div>{eventId && (
      <div>
        <div>Название: {event?.title}</div>
        <div>Начало: {event?.startAt}</div>
        <div>Окончание: {event?.finishAt}</div>
        {currentUser && (currentUser.role === 'USER' || 'ADMIN') && (
          <div>Автор:{' '}
            {/* добавить на бэке имя автора
            только админ может всех юзеров получить */}
            <Link to={`../author/${event?.ownerId}`}>{event?.ownerId}</Link>
          </div>
        )}
        <div>Категория: {event?.category}</div>
        <div>Локация: {event?.place}</div>
        <div>Описание: {event?.description}</div>
        <div>Локация: {event?.place}</div>
        <div>Блокировка: {`${event?.isBlocked}`}</div>
        <div>{currentUser && currentUser.role === 'USER' &&
          <Link to="members">Стать участником</Link>}
        </div>
        <div>{currentUser && currentUser.role === ('USER' || 'ADMIN') &&
          <Link to="members">Посмотреть участников</Link>}
        </div>
        <div><Link to="..">К мероприятиям</Link></div>
      </div>
    )}
    </div>
  );
}
