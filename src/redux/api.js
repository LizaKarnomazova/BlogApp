import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: (page) => ({
        url: `articles?limit=5&offset=${5 * (page - 1)}`,
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('login')
            ? `Token ${JSON.parse(localStorage.getItem('login')).token}`
            : null,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.articles.map(({ slug }) => ({ type: 'Articles', slug })), 'Articles']
          : ['Articles'],
    }),
    getArticle: build.query({
      query: (path) => ({
        url: path,
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('login')
            ? `Token ${JSON.parse(localStorage.getItem('login')).token}`
            : null,
        },
      }),
      providesTags: (result) => {
        const { slug } = result.article;
        if (result) {
          return [{ type: 'Article', slug }, 'Article'];
        }
        return ['Article'];
      },
    }),
    registryUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('login')).token}`,
        },
        body,
      }),
    }),
    createArticle: build.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'POST',
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('login')).token}`,
        },
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('login')).token}`,
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    updateArticle: build.mutation({
      query: ({ body, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('login')).token}`,
        },
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    favoriteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('login')).token}`,
        },
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),
    unfavoriteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('login')).token}`,
        },
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useRegistryUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = api;
