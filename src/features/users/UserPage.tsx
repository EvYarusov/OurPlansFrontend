import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { blockUser, getUserById, unblockUser } from './usersSlice';
import { selectOneUser } from './selectors';
import { selectUser } from '../auth/selectors';

export default function UserPage(): JSX.Element {
    // const error = useSelector(selectError);

    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const user = useSelector(selectOneUser);
    const currentUser = useSelector(selectUser);

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
                <div className="el">Ник: {user?.userName}</div>
                <div className="el">Полное имя: {user?.full_name}</div>
                <div className="el">Возраст: {user?.age}</div>
                <div className="el">Пол: {user?.gender}</div>
                <div className="el">Роль: {user?.role}</div>
                <div className="el">Почта: {user?.email}</div>
                {currentUser && currentUser.role === 'ADMIN' && (
                    <>
                        <div className="el">Блокировка: {`${user?.blocked}`}</div>
                        {user && user.userName !== 'admin' && (
                            <div>
                                {user && !user.blocked && (
                                    <button
                                      className="btn btn-light btn-lg, el"
                                      type="button"
                                      onClick={() => handleBlock(user.id)}
                                    >
                                        Заблокировать пользователя
                                    </button>
                                )}
                                {user && user.blocked && (
                                    <button
                                      className="btn btn-light btn-lg, el"
                                      type="button"
                                      onClick={() => handleUnblock(user.id)}
                                    >
                                        Разблокировать пользователя
                                    </button>
                                )}
                            </div>
                        )}
                        <Link className="btn btn-light btn-lg, el" to="..">К пользователям</Link>
                    </>
                )}
            </div>
        )}
        </div>
    );
}
