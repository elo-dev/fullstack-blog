import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

type Author = {
  _id: string
  fullname: string
  avatarUrl: string
}

type PostItem = {
  _id: string
  title: string
  author: Author
  text: string
  createdAt: string
  viewsCount: number
  tags: string[]
}

type Posts = {
  posts: {
    items: PostItem[]
    loading: boolean
    error: boolean
  }
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts')
  return data
})

const initialState: Posts = {
  posts: {
    items: [],
    loading: false,
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
