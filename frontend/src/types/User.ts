import { Notification } from '@components/Notifications/type'
import { PostItem } from '@myTypes/Post'

export interface User {
  _id: string
  fullname: string
  email: string
  avatarUrl: string
  createdAt: string
  newNotifications: Notification[]
  notifications: Notification[]
  posts: PostItem[]
  followers: User[] & string[]
  following: User[] & string[]
  aboutMe: string
}

export interface Me extends User {
  token: string
}
