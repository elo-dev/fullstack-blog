import { Notification } from '../components/Notifications/type'

export interface User {
  _id: string
  fullname: string
  email: string
  avatarUrl: string
  createdAt: string
  notifications: Notification[]
}

export interface Me extends User {
  token: string
}
