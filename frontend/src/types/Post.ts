import { ArticleProps } from '../components/Article/type'

export type Author = {
  _id: string
  fullname: string
  avatarUrl: string
}

export interface PostItem extends ArticleProps {
  _id: string
  title: string
  author: Author
  text: string
  imageUrl: string
  createdAt: Date
  viewsCount: number
  tags?: string[]
}

export type PostState = {
  posts: {
    items: PostItem[]
    loading: boolean
    error: string[]
  }
}
