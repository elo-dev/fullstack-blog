import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile', 'User', 'Posts'],
  baseQuery,
  endpoints: () => ({}),
})
