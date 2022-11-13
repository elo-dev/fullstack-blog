import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../instance'

export const fetchSearchedPosts = createAsyncThunk(
  'posts/fetchSearchedPosts',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/search/${searchTerm}`)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  posts: [],
  loading: false,
  error: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedPosts.pending, (state) => {
        state.loading = true
        state.posts = []
        state.error = []
      })
      .addCase(fetchSearchedPosts.fulfilled, (state, action: any) => {
        state.loading = false
        state.posts = action.payload
        state.error = []
      })
      .addCase(fetchSearchedPosts.rejected, (state, action: any) => {
        state.loading = false
        state.posts = []
        state.error = action.payload
      })
  },
})

export const postReducer = postsSlice.reducer
