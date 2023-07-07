import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { selectMembers } from './selectors';
import { useAppDispatch } from '../../store';
import { getEventMembers } from './eventsSlice';
import { selectUser } from '../auth/selectors';

export default function Members(): JSX.Element {
    const members = useSelector(selectMembers);
    const dispatch = useAppDispatch();
    const { eventId } = useParams();

    useEffect(() => {
        dispatch(getEventMembers(Number(eventId)));
    }, [dispatch, eventId]);

    const currentUser = useSelector(selectUser);

    if (currentUser?.role !== 'ADMIN' && currentUser?.role !== 'USER') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div>Участники</div>
            {
                eventId && (
                    <ul>
                        {
                            members?.map((element) => (
                                <li key={element.id}>
                                    <div>Ник:{' '}
                                        <Link to={`../users/${element.id.toString()}`}>{element.userName}</Link>
                                    </div>
                                    <div>Возраст: {element.age}</div>
                                    <div>Пол: {element.gender}</div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    );
}
