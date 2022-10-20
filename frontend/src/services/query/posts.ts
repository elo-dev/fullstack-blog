import { api } from './index'
import { PostItem } from '../../types/Post'

const posts = api.injectEndpoints({
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
    getMyPosts: builder.query<PostItem[], string>({
      query: (id) => `/posts/${id}/allmy`,
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
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }, 'Profile'],
    }),
    addNewPost: builder.mutation<any, any>({
      query: ({ formData }) => ({
        url: '/posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }, 'Profile'],
    }),
    patchPost: builder.mutation<any, any>({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }, 'Profile'],
    }),
    postComments: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/posts/${_id}/comment`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
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
  useGetMyPostsQuery,
} = posts
