import { ArticleProps } from '../components/Article/type'

export type Author = {
  _id: string
  fullname: string
  avatarUrl: string
}

export interface Comment {
  _id: string
  author: Author
  emojis: []
  text: string
  createdAt: string
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
  comments: Comment[]
}