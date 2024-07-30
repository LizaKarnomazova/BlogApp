/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

import { useGetArticlesQuery } from '../../redux';
import ArticleDescription from '../../components/articleDescription/articleDescription';
import User from '../../components/user';

import Class from './styles.module.scss';

const ListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get('page');
  const { data = [], isLoading } = useGetArticlesQuery(pageQuery || 1);

  useEffect(() => {
    console.log(pageQuery, data);
  }, [data]);

  function addList() {
    let articles = [];
    while (articles.length < 5) {
      if (isLoading) {
        articles.push(
          <li key={articles.length} className={Class.articleLoading}>
            <h1>Loading...</h1>
          </li>
        );
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
    }
    return articles;
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
