import { PostItem } from '@myTypes/Post'

export interface ArticleProps extends PostItem {
  isEditable?: boolean
  onRemoveArticle: (_id: string) => void
}
