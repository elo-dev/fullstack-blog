import { api } from './index'

import { setUser } from '../slices/userSlice'

import { Login, Register } from '@myTypes/Auth'
import { Me, User } from '@myTypes/User'

const user = api.injectEndpoints({
  endpoints: (builder) => ({
    authMe: builder.query<Me, void>({
      query: () => ({
        url: '/auth/me',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          if (error) return localStorage.removeItem('token')
        }
      },
      providesTags: ['User'],
    }),
    login: builder.mutation({
      query: (params: Login) => ({
        url: '/auth/login',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {}
      },
    }),
    register: builder.mutation<Me, Register>({
      query: (params) => ({
        url: '/auth/register',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {}
      },
    }),
    updateMe: builder.mutation<void, any>({
      query: ({ id, userData }) => ({
        url: `/auth/update/${id}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User', 'Profile'],
    }),
    getNotification: builder.query<User, null>({
      query: () => '/notifications',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {}
      },
    }),
  }),
})

export const {
  useAuthMeQuery,
  useUpdateMeMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetNotificationQuery,
} = user
