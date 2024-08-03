/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from 'antd';

import User from '../../components/user';
import ArticleDescription from '../../components/articleDescription';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';

import Class from './styles.module.scss';

const ArticlePage = () => {
  const { data = {}, isLoading, isError } = useGetArticleQuery(useLocation().pathname);
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();

  useEffect(() => {}, [data]);

  if (isLoading) {
    return (
      <div className={`${Class.article} ${Class.articleLoading}`}>
        <h1>Loading...</h1>
      </div>
    );
  }

  const { author, createdAt, ...props } = data.article;

  return (
    <div className={Class.article}>
      <div className={Class.flex}>
        <ArticleDescription {...props} articlePage={true} className={Class.info} />
        <div>
          <User username={author.username} image={author.image} date={createdAt} />
          {localStorage.getItem('login') ? (
            author.username === JSON.parse(localStorage.getItem('login')).username && (
              <div className={Class.buttons}>
                <Button
                  danger
                  onClick={async () => {
                    await deleteArticle(props.slug);
                    navigate('/');
                  }}
                >
                  Delete
                </Button>
                <Link to={'edit'} state={props} className={Class.button}>
                  Edit
                </Link>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      <Markdown className={Class.body}>{props.body}</Markdown>
    </div>
  );
};

export default ArticlePage;
