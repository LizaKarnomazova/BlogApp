import React from 'react';
import Markdown from 'react-markdown';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from 'antd';

import User from '../../components/user';
import ArticleDescription from '../../components/articleDescription';
import LoadingSpin from '../../components/loadingSpin';
import ErrorIndicator from '../../components/errorIndicator/errorIndicator';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';

import Class from './styles.module.scss';

const ArticlePage = () => {
  const { data = {}, isLoading, isError } = useGetArticleQuery(useLocation().pathname);
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={`${Class.article} ${Class.articleLoading}`}>
        <LoadingSpin />
      </div>
    );
  }

  const { author, createdAt, ...props } = data.article;

  if (isError) {
    return <ErrorIndicator />;
  }

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
