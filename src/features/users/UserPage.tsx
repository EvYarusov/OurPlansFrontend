import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { blockUser, getUserById, unblockUser } from './usersSlice';
import { selectUser } from './selectors';

export default function UserPage(): JSX.Element {
    // const error = useSelector(selectError);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getUserById(Number(userId)));
    }, [dispatch, userId]);

    function handleBlock(id: number):void {
        dispatch(blockUser(id));
        dispatch(getUserById(Number(id)));
    }
    function handleUnblock(id: number):void {
        dispatch(unblockUser(id));
        dispatch(getUserById(Number(id)));
    }

    return (
        <div>{userId ? (
            <div>
                {user?.userName}
                {`${user?.blocked}`}
                {user && !user.blocked &&
                 <button type="button" onClick={() => handleBlock(user.id)}>Заблокировать пользователя</button>}
                {user && user.blocked &&
                 <button type="button" onClick={() => handleUnblock(user.id)}>Разблокировать пользователя</button>}
                <Link to="..">Назад к пользователям</Link>
            </div>
        ) : 'Not ok'}
        </div>
    );
}
