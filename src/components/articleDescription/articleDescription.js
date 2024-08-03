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

  return (
    <article className={articlePage ? Class.infoArticlePage : Class.info}>
      <div className={Class.title}>
        {articlePage ? (
          title
        ) : (
          <Link to={`/articles/${slug}`} state={props} className={Class.title}>
            {title.length > 60 ? `${title.slice(0, 55)}...` : title}
          </Link>
        )}
        <Like favoritesCount={favoritesCount} slug={slug} favorited={favorited} />
      </div>
      <ul className={Class.tags}>{tags}</ul>
      {articlePage ? (
        <p className={Class.description}>{description}</p>
      ) : (
        <p className={Class.description}>
          {description.length > 150 ? `${description.slice(0, 145)}...` : description}
        </p>
      )}
    </article>
  );
};

export default ArticleDescription;
