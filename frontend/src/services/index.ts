import { configureStore } from '@reduxjs/toolkit'
import { posts } from './query/posts'
import { authReducer } from './slices/auth'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [posts.reducerPath]: posts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(posts.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
