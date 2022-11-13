import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@services/index'
import { AuthState } from '@myTypes/Auth'

const initialState: AuthState = {
  user: null,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: () => initialState,
  },
})

export const { logout, setUser } = userSlice.actions

export const userReducer = userSlice.reducer

export const currentUser = (state: RootState) => state.user
export const selectIsAuth = (state: RootState) => Boolean(state.user.user)
