import { User } from '@myTypes/User'

export type PossibleSubscribersProps = {
  handleFollow: (user: User) => void
  isLoadingFollow: boolean
  suggestFriends?: User[]
  isAuth: boolean
}
