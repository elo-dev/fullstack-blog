import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const posts = createApi({
  reducerPath: 'posts',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, void>({
      query: () => `/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Posts', id: _id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getOnePost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: () => [{ type: 'Posts', id: 'LIST' }],
    }),
    getFiltredByNewPost: builder.mutation<any, void>({
      query: () => ({
        url: '/filter/new',
        method: 'GET',
      }),
    }),
    getFiltredByPopularPost: builder.mutation<any, void>({
      query: () => ({
        url: '/filter/popular',
        method: 'GET',
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    addNewPost: builder.mutation<any, any>({
      query: ({ formData }) => ({
        url: '/posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    patchPost: builder.mutation<any, any>({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    postComments: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/posts/${_id}/comment`,
        method: 'POST',
        body: rest,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetOnePostQuery,
  useGetFiltredByNewPostMutation,
  useGetFiltredByPopularPostMutation,
  useDeletePostMutation,
  useAddNewPostMutation,
  usePatchPostMutation,
  usePostCommentsMutation,
} = posts
