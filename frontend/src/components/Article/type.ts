import { User } from '../../types/User'

export type ArticleProps = {
  isEditable?: boolean
  onRemoveArticle?: (_id: string) => void
  user: User
}
