import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../features/auth/selectors';
import { useAppDispatch } from '../../store';
import { getUser } from '../../features/auth/authSlice';

export default function Navbar():JSX.Element {
  const user = useSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <nav>
        <NavLink to="/events">Events</NavLink>
        {user && user.role === 'ADMIN' && <NavLink to="/users">Users</NavLink>}
        {user && <NavLink to="/profile">{user.email}</NavLink>}
    </nav>
  );
}
