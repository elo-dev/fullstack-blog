import { User } from '@myTypes/User'

export type Register = {
  email: string
  password: string
  fullname: string
  avatarUrl?: string
}

export type Login = {
  email: string
  password: string
}

export type AuthState = {
  user: User | null
}

export type Update = {
  id: string
  fullname: string | Blob
  email: string | Blob
  aboutMe: string | Blob
  avatarUrl: string | Blob
}
