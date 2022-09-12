import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostState } from '../../types/Post'
import { instance } from '../../instance'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts')
  return data
})

const initialState: PostState = {
  posts: {
    items: [],
    loading: true,
    error: false,
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = []
        state.posts.loading = true
        state.posts.error = false
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload
        state.posts.loading = false
        state.posts.error = false
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = []
        state.posts.loading = false
        state.posts.error = true
      })
  },
})

export const postsReducer = postsSlice.reducer
