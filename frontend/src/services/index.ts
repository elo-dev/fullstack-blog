import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './slices/posts'

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
