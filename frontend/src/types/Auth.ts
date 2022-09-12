import { User } from './User'

type Error = {
  value: string
  message: string
  param: string
  location: string
}

export type Register = {
  email: string
  password: string
  fullname: string
  avatarUrl: string
}

export type Login = {
  email: string
  password: string
}

export type AuthState = {
  user: User | null
  loading: boolean
  error: Error[] | null
}
