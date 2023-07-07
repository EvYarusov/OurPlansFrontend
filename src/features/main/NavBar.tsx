import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { logout } from '../auth/authSlice';
import { selectUser } from '../auth/selectors';
import style from './NavBar.module.css';

function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const handleLogout = React.useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      const dispatchResult = await dispatch(logout());
      if (logout.fulfilled.match(dispatchResult)) {
        navigate('/auth/login');
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className={style.navbar}>
      <NavLink className={style.navbarEl} to="/categories">Категории</NavLink>
      <NavLink className={style.navbarEl} to="/places">Локации</NavLink>
      <NavLink className={style.navbarEl} to="/events">Мероприятия</NavLink>
      {currentUser && currentUser.role === 'ADMIN' &&
        <NavLink className={style.navbarEl} to="/users">Пользователи</NavLink>}
      {/* <p>{user?.email}</p> */}
      {currentUser && <NavLink className={style.navbarEl} to="/profile">{currentUser.email}</NavLink>}
      {currentUser && (
        <a href="#" className={style.navbarEl} role="button" tabIndex={0} onClick={handleLogout}>
          Выйти
        </a>
      )}

      {!currentUser && (
        <>
          <Link className={style.navbarEl} to="/auth/login">
            Войти
          </Link>
          <Link className={style.navbarEl} to="/auth/register">
            Регистрация
          </Link>
        </>
      )}

      {location.pathname === '/' ? (
        <>
        </>
      ) : (
        <Link className={style.navbarEl} to="/">
          На главную
        </Link>
      )}
    </div>
  );
}

export default NavBar;
