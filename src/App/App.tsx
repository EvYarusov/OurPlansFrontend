import { Routes, Route, HashRouter } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalizationProvider } from '@mui/x-date-pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Layout from '../features/main/Layout';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import { getUser } from '../features/auth/authSlice';
import { selectAuthChecked } from '../features/auth/selectors';
import { useAppDispatch } from '../store';
import Users from '../features/users/Users';
import UserPage from '../features/users/UserPage';
import Events from '../features/events/Events';
import AddEvent from '../features/events/AddEvent';
import EventPage from '../features/events/EventPage';
import Categories from '../features/categories/Categories';
import Places from '../features/places/Places';
import Profile from '../features/auth/Profile';
import EventsByAuthor from '../features/events/EventsByAuthor';
import { getAllEvents } from '../features/events/eventsSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authChecked = useSelector(selectAuthChecked);

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(getAllEvents());
    // console.log(authChecked);
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />}>
              <Route path=":userId" element={<UserPage />} />
            </Route>
            <Route path="/events/add" element={<AddEvent />} />
            <Route path="/events/author/:authorId" element={<EventsByAuthor />} />
            <Route path="/events" element={<Events />}>

              <Route path=":eventId" element={<EventPage />} />
            </Route>
            <Route path="/categories" element={<Categories />} />
            <Route path="/places" element={<Places />} />
          </Route>
        </Routes>
      </HashRouter>
    </LocalizationProvider>
  );
}

export default App;
