import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

import User from '../user';

import Class from './layout.module.scss';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('login'));

  return (
    <div className={Class.app}>
      <header className={Class.header}>
        <span>Realworld Blog</span>
        <div className={Class.buttons}>
          {user ? (
            <>
              <Link to={'/sign-up'} className={`${Class.button} ${Class.active}`}>
                Create article
              </Link>
              <User username={user && user.username} image={user && user.image} editProfilePage={true} />
              <Link
                to={'/articles'}
                className={Class.button}
                onClick={() => {
                  localStorage.removeItem('login');
                }}
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to={'/sign-in'}
                className={({ isActive }) => (isActive ? `${Class.button} ${Class.active}` : Class.button)}
                end
              >
                Sign In
              </NavLink>
              <NavLink
                to={'/sign-up'}
                className={({ isActive }) => (isActive ? `${Class.button} ${Class.active}` : Class.button)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </header>
      <main className={Class.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
