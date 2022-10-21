import { Notification } from '../components/Notifications/type'
import { PostItem } from './Post'

export interface User {
  _id: string
  fullname: string
  email: string
  avatarUrl: string
  createdAt: string
  notifications: Notification[]
  posts: PostItem[]
  followers: string[]
  following: string[]
  aboutMe: string
}

export interface Me extends User {
  token: string
}
