import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { instance } from '../../instance'
import { AuthState, Login, Register } from '../../types/Auth'
import { Me, User } from '../../types/User'

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params: Login, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<User>('/auth/login', params)

      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await instance.get<Me>('/auth/me')
  return data
})

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params: Register, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<Me>('/auth/register', params)

      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchLogin.rejected, (state, action: any) => {
        state.loading = false
        state.user = null
        state.error = action.payload
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchAuthMe.rejected, (state, action: any) => {
        state.loading = false
        state.user = null
        state.error = action.payload
      })
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchRegister.rejected, (state, action: any) => {
        state.loading = false
        state.user = null
        state.error = action.payload
      })
  },
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.user)

export const { logout } = authSlice.actions

export const authReducer = authSlice.reducer
