import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { logout } from '../auth/authSlice';
import { selectUser } from '../auth/selectors';

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
    <div className="navbar-box">
      <NavLink className="btn btn-light btn-lg" to="/categories">Категории</NavLink>
      <NavLink className="btn btn-light btn-lg" to="/places">Локации</NavLink>
      <NavLink className="btn btn-light btn-lg" to="/events">Мероприятия</NavLink>
      {currentUser && currentUser.role === 'ADMIN' &&
      <NavLink className="btn btn-light btn-lg" to="/users">Пользователи</NavLink>}
      {/* <p>{user?.email}</p> */}
      {currentUser && <NavLink className="btn btn-light btn-lg" to="/profile">{currentUser.email}</NavLink>}
      {currentUser && (
        <a href="#" className="btn btn-light btn-lg" role="button" tabIndex={0} onClick={handleLogout}>
          Выйти
        </a>
      )}
      <div>
        {!currentUser && (
          <>
            <Link className="btn btn-light btn-lg" to="/auth/login">
              Войти
            </Link>
            <Link className="btn btn-light btn-lg" to="/auth/register">
              Регистрация
            </Link>
          </>
        )}
      </div>
      <div>
        {location.pathname === '/' ? (
          <>
          </>
        ) : (
          <Link className="btn btn-light btn-lg" to="/">
            На главную
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
