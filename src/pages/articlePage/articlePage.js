/* eslint-disable no-console */
import React from 'react';
import Markdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

import User from '../../components/user';
import ArticleDescription from '../../components/articleDescription';

import Class from './styles.module.scss';

const ArticlePage = () => {
  const { body, author, createdAt, ...props } = useLocation().state;
  const { username, image } = author;

  return (
    <div className={Class.article}>
      <div className={Class.flex}>
        <ArticleDescription {...props} articlePage={true} className={Class.info} />

        <User username={username} image={image} date={createdAt} />
      </div>
      <Markdown className={Class.body}>{body}</Markdown>
    </div>
  );
};

export default ArticlePage;
