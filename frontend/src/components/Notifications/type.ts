export type Notification = {
  userId: string
  postId: string
  fullname: string
  avatarUrl: string
  title: string
  description: string
}

export type NotificationProps = {
  setIsOpenNotification: (prev: any) => void
  notifications: Notification[]
}
