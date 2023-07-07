import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectEvent, selectEvents, selectMembers } from './selectors';
import { useAppDispatch } from '../../store';
import { attendEvent, blockEvent, getEventById, getEventMembers, retireEvent } from './eventsSlice';
import { selectUser } from '../auth/selectors';
import Members from './Members';

export default function EventPage(): JSX.Element {
  const event = useSelector(selectEvent);
  const events = useSelector(selectEvents);
  const dispatch = useAppDispatch();
  const { eventId } = useParams();
  const currentUser = useSelector(selectUser);
  const members = useSelector(selectMembers);
  const [membersFlag, seeMembersFlag] = useState(false);

  function handleJoinEvent(): void {
    dispatch(attendEvent(Number(eventId)));
    dispatch(getEventMembers(Number(eventId)));
    seeMembersFlag(true);
  }
  function handleRetireEvent(): void {
    dispatch(retireEvent(Number(eventId)));
    dispatch(getEventMembers(Number(eventId)));
    seeMembersFlag(true);
  }

  function handleBlock(id: number, status: boolean): void {
    dispatch(blockEvent({ id, status }));
  }

  useEffect(() => {
    dispatch(getEventById(Number(eventId)));
    dispatch(getEventMembers(Number(eventId)));
  }, [dispatch, eventId, events]);

  return (
    <div>
      <Link className="btn btn-light btn-lg, el" to="..">К мероприятиям</Link>
      {eventId && (
        <div className="el">
          <div className="el">Название: {event?.title}</div>
          <div className="el">Начало: {event?.startAt}</div>
          <div className="el">Окончание: {event?.finishAt}</div>
          {currentUser && (currentUser.role === 'USER' || 'ADMIN') && (
            <>
              <div className="el">Автор:{' '}
                <Link className="grey" to={`../../users/${event?.ownerId.toString()}`}>{event?.ownerId}</Link>
              </div>
              {/* добавить на бэке имя автора. только админ может всех юзеров получить */}
              <Link className="el, grey" to={`../author/${event?.ownerId}`}>
                Мероприятия этого автора
              </Link>
            </>
          )}
          <div className="el">Категория: {event?.category}</div>
          <div className="el">Локация: {event?.place}</div>
          <div className="el">Описание: {event?.description}</div>
          <div className="el">Локация: {event?.place}</div>
          <div className="el">Блокировка: {`${event?.isBlocked}`}</div>
          <div className="сhildren-horizontally">
            {currentUser && currentUser.role === ('USER' || 'ADMIN') && (
              <button
                className="btn btn-light btn-lg, el"
                type="button"
                onClick={() => { seeMembersFlag(true); }}
              >Посмотреть участников
              </button>
            )}
            {currentUser && currentUser.role === 'USER' && (
              <div>
                <button
                  className="btn btn-light btn-lg, el"
                  type="button"
                  onClick={() => { handleJoinEvent(); }}
                >Присоединиться к мероприятию
                </button>
                <button
                  className="btn btn-light btn-lg, el"
                  type="button"
                  onClick={() => { handleRetireEvent(); }}
                >Покинуть мероприятие
                </button>
              </div>
            )}
            {currentUser && currentUser.role === 'USER' && currentUser.id === event?.ownerId && (
              <button
                className="btn btn-light btn-lg, el"
                type="button"
              // onClick={() => { handleRetireEvent(); }}
              >Удалить мероприятие
              </button>
            )}
          </div>
          {
            eventId && members && (
              <ul>
                {
                  membersFlag &&
                  <Members />
                }
              </ul>
            )
          }
        </div>
      )}
      {currentUser && currentUser.role === 'ADMIN' && (
        <>
          {event && !event?.isBlocked && (
            <button
              type="button"
              className="btn btn-light btn-lg, el"
              onClick={() => handleBlock(event.id, true)}
            >
              Заблокировать мероприятие
            </button>
          )}
          {event && event?.isBlocked && (
            <button
              type="button"
              className="btn btn-light btn-lg, el"
              onClick={() => handleBlock(event.id, false)}
            >
              Разблокировать мероприятие
            </button>
          )}
        </>
      )}
    </div>
  );
}
