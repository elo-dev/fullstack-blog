export type PossibleSubscribersProps = {
  handleFollow: (_id: string) => void
  handleUnfollow: (_id: string) => void
  isLoadingFollow: boolean
  isLoadingUnfollow: boolean
}
