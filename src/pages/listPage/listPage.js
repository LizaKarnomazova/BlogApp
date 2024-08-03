import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

import { useGetArticlesQuery } from '../../redux';
import ArticleDescription from '../../components/articleDescription/articleDescription';
import User from '../../components/user';
import ErrorIndicator from '../../components/error-indicator/error-indicator';

import Class from './styles.module.scss';

const ListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get('page');
  const { data = [], isLoading, isError } = useGetArticlesQuery(pageQuery || 1);

  function addList() {
    let articles = [];
    if (isLoading) {
      while (articles.length < 5) {
        articles.push(
          <li key={articles.length} className={Class.articleLoading}>
            <h1>Loading...</h1>
          </li>
        );
      }
    } else {
      articles = data.articles.map((item) => {
        const { username, image } = item.author;
        return (
          <li key={item.slug} className={Class.article}>
            <ArticleDescription {...item} />
            <User username={username} image={image} date={item.createdAt} />
          </li>
        );
      });
    }
    return articles;
  }

  if (isError) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <ul className={Class.articlesList}>{addList()}</ul>
      <Pagination
        className={Class.pagination}
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
