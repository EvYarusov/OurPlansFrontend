import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCategories } from './selectors';
import { useAppDispatch } from '../../store';
import { getAllCategories } from './categoriesSlice';

export default function Categories(): JSX.Element {
  const categories = useSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <div className="el">Категории</div>
      <div className="navbar-box">
        {
          categories?.map((element) => (
            <NavLink className="btn btn-light btn-lg, el" to="../events">
              {element}
            </NavLink>
          ))
        }
      </div>
    </>
  );
}
