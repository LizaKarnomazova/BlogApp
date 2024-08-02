import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import User from '../user';

import Class from './styles.module.scss';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('login'));
  const navigator = useNavigate();
  const [isActive, setIsAtive] = useState(true);

  return (
    <div className={Class.app}>
      <header className={Class.header}>
        <Link to={'/'} style={{ color: 'black' }}>
          Realworld Blog
        </Link>
        <div className={Class.buttons}>
          {user ? (
            <>
              <Link
                to={'/new-article'}
                className={isActive ? `${Class.button} ${Class.active}` : Class.button}
              >
                Create article
              </Link>
              <User
                username={user && user.username}
                image={user && user.image}
                editProfilePage={true}
              />
              <Link
                to={'/articles'}
                className={Class.button}
                onClick={() => {
                  localStorage.removeItem('login');
                  navigator('/');
                }}
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link
                to={'/sign-in'}
                className={isActive ? `${Class.button} ${Class.active}` : Class.button}
                onClick={() => {
                  if (!isActive) setIsAtive(!isActive);
                }}
              >
                Sign In
              </Link>
              <Link
                to={'/sign-up'}
                className={isActive ? Class.button : `${Class.button} ${Class.active}`}
                onClick={() => {
                  if (isActive) setIsAtive(!isActive);
                }}
              >
                Sign Up
              </Link>
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
