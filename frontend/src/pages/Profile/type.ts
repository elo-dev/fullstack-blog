import { User } from '../../types/User'

export type SidebarProps = {
  userProfile?: User | null
  authUser?: User | null
  scrollRef: any
  handleFollow: (user: User) => void
  handleUnfollow: (_id: string) => void
  isLoadingFollow: boolean
  isLoadingUnfollow: boolean
  suggestFriends?: User[]
  isAuth: boolean
}
