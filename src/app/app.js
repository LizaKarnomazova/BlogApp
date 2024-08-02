/* eslint-disable no-console */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/layout';
import ListPage from '../pages/listPage';
import ArticlePage from '../pages/articlePage';
import SignInPage from '../pages/signInPage';
import SignUpPage from '../pages/signUpPage';
import EditProfilePage from '../pages/editProfilePage';
import NewArticlePage from '../pages/newArticlePage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="articles" replace />} />
      <Route path="articles">
        <Route index element={<ListPage />} />
        <Route path=":slug" element={<ArticlePage />} />
        <Route path=":slug/edit" element={<NewArticlePage />} />
      </Route>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="profile" element={<EditProfilePage />} />
      <Route path="new-article" element={<NewArticlePage />} />
    </Route>
  </Routes>
);

export default App;
