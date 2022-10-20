import { User } from './User'

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
  user: User
}

export type Update = {
  id: string
  userData: {
    name?: string
    email?: string
    avatarUrl?: string
  }
}
