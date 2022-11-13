import { api } from '@services/query/index'

import { User } from '@myTypes/User'

const profile = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, string | undefined>({
      query: (id) => `/profile/${id}`,
      providesTags: ['Profile'],
    }),
    follow: builder.mutation({
      query: (followId) => ({
        url: '/follow',
        method: 'PATCH',
        body: {
          followId,
        },
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
    unfollow: builder.mutation({
      query: (unfollowId) => ({
        url: '/unfollow',
        method: 'PATCH',
        body: {
          unfollowId,
        },
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
    getTags: builder.query<[], void>({
      query: () => '/tags',
      providesTags: ['Profile'],
    }),
    getSuggestedFriends: builder.query<User[], void>({
      query: () => '/suggestedFriends',
      providesTags: ['User'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetTagsQuery,
  useGetSuggestedFriendsQuery,
} = profile
