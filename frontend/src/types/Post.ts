import { IEmojiData } from 'emoji-picker-react'

export type Author = {
  _id: string
  fullname: string
  avatarUrl: string
}

export interface IComment {
  _id: string
  author: Author
  emojis: IEmojiData[]
  text: string
  createdAt: string
}

export interface PostItem {
  _id: string
  title: string
  author: Author
  text: string
  imageUrl: string
  createdAt: Date
  viewsCount: number
  tags?: {
    _id: string
    tag: []
  }
  comments: IComment[]
}
