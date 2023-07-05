import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { blockUser, getUserById, unblockUser } from './usersSlice';
import { selectUser } from './selectors';

export default function UserPage(): JSX.Element {
    // const error = useSelector(selectError);

    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getUserById(Number(userId)));
    }, [dispatch, userId]);

    function handleBlock(id: number): void {
        dispatch(blockUser(id));
        dispatch(getUserById(Number(id)));
    }
    function handleUnblock(id: number): void {
        dispatch(unblockUser(id));
        dispatch(getUserById(Number(id)));
    }

    return (
        <div>{userId && (
            <div>
                <div>Ник: {user?.userName}</div>
                <div>Полное имя: {user?.full_name}</div>
                <div>Возраст: {user?.age}</div>
                <div>Пол: {user?.gender}</div>
                <div>Роль: {user?.role}</div>
                <div>Почта: {user?.email}</div>
                {user && user.role !== 'ADMIN' && (
                    <>
                        <div>Блокировка: {`${user?.blocked}`}</div>
                        <div>{!user.blocked && (
                            <button type="button" onClick={() => handleBlock(user.id)}>
                                Заблокировать пользователя
                            </button>
                          )}
                        </div>
                        <div>{user.blocked && (
                            <button type="button" onClick={() => handleUnblock(user.id)}>
                                Разблокировать пользователя
                            </button>
                          )}
                        </div>
                    </>
                )}
                <Link to="..">Назад к пользователям</Link>
            </div>
        )}
        </div>
    );
}
