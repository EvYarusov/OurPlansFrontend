import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useParams } from 'react-router-dom';
import { selectUsers } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllUsers } from './usersSlice';
import { selectUser } from '../auth/selectors';

export default function Users(): JSX.Element {
    // const error = useSelector(selectError);
    const users = useSelector(selectUsers);
    const dispatch = useAppDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const currentUser = useSelector(selectUser);

    if (currentUser?.role !== 'USER' && currentUser?.role !== 'ADMIN') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="el">Пользователи</div>
            {
                userId ? <Outlet /> : (
                    <ul>
                        {
                            users?.map((element) => (
                                <li key={element.id} className="el">
                                    <div>Ник:{' '}
                                        <Link to={element.id.toString()}>{element.userName}</Link>
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
