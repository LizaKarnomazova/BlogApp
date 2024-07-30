import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: (page) => `articles?offset=${5 * (page - 1)}&limit=5`,
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
  }),
});

export const { useGetArticlesQuery, useRegistryUserMutation, useLoginUserMutation, useUpdateUserMutation } =
  api;
