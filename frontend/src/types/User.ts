export interface User {
  _id: string
  fullname: string
  email: string
  avatarUrl: string
  createdAt: string
}

export interface Me extends User {
  token: string
}
