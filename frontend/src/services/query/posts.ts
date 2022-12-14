import { api } from '@services/query/index'
import { PostItem } from '@myTypes/Post'

const posts = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostItem[], void>({
      query: () => `/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Posts' as const, id: _id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getOnePost: builder.query<PostItem, string | undefined>({
      query: (id) => `/posts/${id}`,
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
    getFiltredByFriends: builder.mutation<any, void>({
      query: () => ({
        url: '/filter/friends',
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
  useGetFiltredByFriendsMutation,
  useDeletePostMutation,
  useAddNewPostMutation,
  usePatchPostMutation,
  usePostCommentsMutation,
  useGetMyPostsQuery,
} = posts
