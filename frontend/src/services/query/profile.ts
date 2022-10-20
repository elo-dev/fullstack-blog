import { api } from './index'

import { User } from '../../types/User'

const profile = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({
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
  }),
})

export const { useGetProfileQuery, useFollowMutation, useUnfollowMutation } =
  profile
