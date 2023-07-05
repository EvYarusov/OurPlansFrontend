import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Categories(): JSX.Element {
  return (
    <>
      <div>Категории</div>
      <div className="navbar-box">
        <NavLink className="btn btn-light btn-lg" to="../events/place">Дети</NavLink>
        <NavLink className="btn btn-light btn-lg" to="../events/place">Домашние животные</NavLink>
        <NavLink className="btn btn-light btn-lg" to="../events/place">Настольные игры</NavLink>
        <NavLink className="btn btn-light btn-lg" to="../events/place">Покупки</NavLink>
        <NavLink className="btn btn-light btn-lg" to="../events/place">Спорт</NavLink>
      </div>
    </>
  );
}
