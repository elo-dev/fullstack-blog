import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostState } from '../../types/Post'
import { instance } from '../../instance'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts')
  return data
})

export const fetchDeletePost = createAsyncThunk(
  'posts/fetchDeletePost',
  async (id: string) => {
    await instance.delete(`/posts/${id}`)
    return id
  }
)

const initialState: PostState = {
  posts: {
    items: [],
    loading: true,
    error: [],
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.loading = true
        state.posts.items = []
        state.posts.error = []
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.loading = false
        state.posts.items = action.payload
        state.posts.error = []
      })
      .addCase(fetchPosts.rejected, (state, action: any) => {
        state.posts.loading = false
        state.posts.items = []
        state.posts.error = action.payload
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (obj) => obj._id !== action.meta.arg
        )
      })
  },
})

export const postsReducer = postsSlice.reducer
