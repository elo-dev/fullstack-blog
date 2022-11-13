import { User } from '../../types/User'

export type SidebarProps = {
  userProfile?: User | null
  authUser?: User | null
  scrollRef: any
  handleFollow: (_id?: string) => void
  handleUnfollow: (_id?: string) => void
  isLoadingFollow: boolean
  isLoadingUnfollow: boolean
}
