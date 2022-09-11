export type Author = {
  _id: string
  fullname: string
  avatarUrl: string
}

export type PostItem = {
  _id: string
  title: string
  author: Author
  text: string
  createdAt: string
  viewsCount: number
  tags: string[]
}

export type Posts = {
  posts: {
    items: PostItem[]
    loading: boolean
    error: boolean
  }
}
