/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

import { useGetArticlesQuery } from '../../redux';
import ArticleDescription from '../../components/articleDescription/articleDescription';
import User from '../../components/user';
import ErrorIndicator from '../../components/errorIndicator/errorIndicator';
import LoadingSpin from '../../components/loadingSpin';

import Class from './styles.module.scss';

const ListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get('page');
  const { data = [], isLoading, isError } = useGetArticlesQuery(pageQuery || 1);

  const articleS = data.articles?.map((item) => {
    const { username, image } = item.author;
    return (
      <li key={item.slug} className={Class.article}>
        <ArticleDescription {...item} />
        <User username={username} image={image} date={item.createdAt} />
      </li>
    );
  });

  if (isLoading) {
    return (
      <div className={`${Class.article} ${Class.articleLoading}`}>
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <ul className={Class.articlesList}>{articleS}</ul>
      <Pagination
        className={Class.center}
        defaultCurrent={pageQuery}
        showSizeChanger={false}
        total={isLoading ? 50 : data.articlesCount * 2}
        onChange={(e) => {
          setSearchParams({ page: e });
        }}
      />
    </>
  );
};

export default ListPage;
