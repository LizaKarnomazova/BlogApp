/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';

import Like from '../like';

import Class from './styles.module.scss';

const ArticleDescription = (props) => {
  const {
    title,
    favoritesCount,
    description,
    tagList,
    slug,
    favorited,
    articlePage = false,
  } = props;

  const tags = tagList.map((tag) => {
    if (tag) {
      return (
        <li className={Class.tag} key={`${tag}${Math.random()}`}>
          {tag.trim()}
        </li>
      );
    }
    return <></>;
  });

  function sliceText(text, maxSize) {
    let newText;
    if (text && text.length > maxSize) {
      newText = text.slice(0, maxSize);
      while (newText[newText.length - 1] !== ' ') {
        newText = newText.slice(0, -1);
      }
      return `${newText} ...`;
    }
    return text;
  }

  return (
    <article className={articlePage ? Class.infoArticlePage : Class.info}>
      <div>
        {articlePage ? (
          <span className={Class.title}>{title}</span>
        ) : (
          <Link to={`/articles/${slug}`} state={props} className={Class.title}>
            {sliceText(title, 60)}
          </Link>
        )}
        <Like favoritesCount={favoritesCount} slug={slug} favorited={favorited} />
      </div>
      <ul className={Class.tags}>{tags}</ul>
      <p className={Class.description}>{articlePage ? description : sliceText(description, 150)}</p>
    </article>
  );
};

export default ArticleDescription;
