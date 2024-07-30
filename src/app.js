/* eslint-disable no-console */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout';
import ListPage from './pages/listPage';
import ArticlePage from './pages/articlePage';
import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';
import EditProfilePage from './pages/editProfilePage';

const App = () => {
  console.log('bip');
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<ListPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="profile" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
