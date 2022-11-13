import { configureStore } from '@reduxjs/toolkit'
import { api } from '@services/query/index'
import { postReducer } from '@services/slices/posts'
import { userReducer } from '@services/slices/userSlice'

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
