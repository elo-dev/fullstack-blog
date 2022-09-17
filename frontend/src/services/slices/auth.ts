import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
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
  try {
    const { data } = await instance.get<Me>('/auth/me')
    return data
  } catch (error) {}
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
  error: [],
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
      .addMatcher(
        isAnyOf(fetchLogin.pending, fetchAuthMe.pending, fetchRegister.pending),
        (state) => {
          state.loading = true
          state.user = null
          state.error = []
        }
      )
      .addMatcher(
        isAnyOf(
          fetchLogin.fulfilled,
          fetchAuthMe.fulfilled,
          fetchRegister.fulfilled
        ),
        (state, { payload }) => {
          state.loading = false
          state.user = payload
          state.error = []
        }
      )
      .addMatcher(
        isAnyOf(
          fetchLogin.rejected,
          fetchAuthMe.rejected,
          fetchRegister.rejected
        ),
        (state, { payload }: any) => {
          state.loading = false
          state.user = null
          state.error = payload
        }
      )
  },
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.user)

export const { logout } = authSlice.actions

export const authReducer = authSlice.reducer
