import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Main(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Main;
