import { IComment } from '@myTypes/Post'
import { User } from '@myTypes/User'

export type CommentsProps = {
  _id?: string
  comments?: IComment[]
  user: User | null
}
