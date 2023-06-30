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

    if (currentUser?.role !== 'ADMIN') { return <Navigate to="/" />; }

        return (
            <>
                {
                    userId ? <Outlet /> : (
                        <ul>
                            {
                                users?.map((element) => (
                                    <li key={element.id}>
                                        <div>{element.userName}</div>
                                        <div>{element.full_name}</div>
                                        <div>{element.age}</div>
                                        <div>{element.gender}</div>
                                        <div>{`${element.blocked}`}</div>
                                        <Link to={element.id.toString()}>К пользователю</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                <div />
            </>
        );
}
