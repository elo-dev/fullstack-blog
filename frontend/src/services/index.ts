import { configureStore } from '@reduxjs/toolkit'
import { api } from './query'
import { postReducer } from './slices/posts'
import { userReducer } from './slices/userSlice'

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
