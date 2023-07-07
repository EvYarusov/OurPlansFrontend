import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectPlaces } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllPlaces } from './placesSlice';

export default function Places():JSX.Element {
  const places = useSelector(selectPlaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPlaces());
  }, [dispatch]);

  return (
    <>
      <div className="el">Локации</div>
      <div className="navbar-box">
        {
          places?.map((place) => (
            <NavLink className="btn btn-light btn-lg, el" to="../events">
              {place}
            </NavLink>
          ))
        }
      </div>
    </>
  );
}
