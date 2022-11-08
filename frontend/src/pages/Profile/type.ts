import { User } from '../../types/User'

export type SidebarProps = {
  userProfile: User
  authUser: User
  scrollRef: any
  handleFollow: (_id?: string) => void
  handleUnfollow: (_id?: string) => void
  isLoadingFollow: boolean
  isLoadingUnfollow: boolean
}
