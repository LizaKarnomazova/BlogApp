import React from 'react';

import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../../redux';

import Class from './styles.module.scss';

const Like = ({ favoritesCount, favorited, slug }) => {
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();
  const user = localStorage.getItem('login');

  function currentStyle() {
    let style;
    if (user) {
      style = favorited ? Class.favorite : Class.unfavorite;
    } else style = Class.like;
    return style;
  }

  return (
    <button
      className={currentStyle()}
      onClick={async () => {
        if (user) {
          if (favorited) await unfavoriteArticle(slug);
          else await favoriteArticle(slug);
        }
      }}
    >
      {favoritesCount}
    </button>
  );
};

export default Like;
