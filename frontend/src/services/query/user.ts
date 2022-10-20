import { api } from './index'

import { Login, Register, Update } from '../../types/Auth'
import { Me } from '../../types/User'
import { setUser } from '../slices/userSlice'

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
        } catch (error) {}
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
    updateMe: builder.mutation({
      query: ({ id, userData }: Update) => ({
        url: `/auth/update/${id}`,
        method: 'PATCH',
        body: userData,
      }),
    }),
  }),
})

export const {
  useAuthMeQuery,
  useUpdateMeMutation,
  useLoginMutation,
  useRegisterMutation,
} = user
