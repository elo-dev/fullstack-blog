import { useRef } from 'react'
import { Navigate, Outlet, useParams } from 'react-router'

import RecommendsTags from '@pages/Profile/RecommendsTags'
import Sidebar from '@pages/Profile/Sidebar'
import NotFound from '@pages/NotFound/NotFound'

import Back from '@components/Back/Back'
import Loader from '@components/Loader/Loader'
import PossibleSubscribers from '@components/PossibleSubscribers/PossibleSubscribers'

import { useAppDispatch, useAppSelector } from '@hooks/index'

import {
  useFollowMutation,
  useGetProfileQuery,
  useGetSuggestedFriendsQuery,
  useUnfollowMutation,
} from '@services/query/profile'
import {
  currentUser,
  selectIsAuth,
  setFollow,
  setUnfollow,
} from '@services/slices/userSlice'
import { ServerError } from '@myTypes/Error'
import { User } from '@myTypes/User'

const ProfileLayout = () => {
  const { id } = useParams()
  const { data: profile, isLoading, error } = useGetProfileQuery(id)
  const { data: suggestFriends } = useGetSuggestedFriendsQuery()

  const isAuth = useAppSelector(selectIsAuth)
  const { user } = useAppSelector(currentUser)

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation()
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowMutation()
  const dispatch = useAppDispatch()

  const handleFollow = async (userProfile: User) => {
    await follow(userProfile._id).unwrap()
    dispatch(setFollow(userProfile))
  }

  const handleUnfollow = async (id: string) => {
    await unfollow(id).unwrap()
    dispatch(setUnfollow(id))
  }

  if (isLoading) return <Loader />
  if (error) return <NotFound error={error as ServerError} />
  if (!profile) return <Navigate to={'/'} />

  return (
    <>
      <Back />
      <div className="my-4 grid grid-cols-4 gap-5 md:grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 space-y-5">
          <Sidebar
            authUser={user}
            userProfile={profile}
            scrollRef={scrollRef}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
            isLoadingFollow={isLoadingFollow}
            isLoadingUnfollow={isLoadingUnfollow}
            isAuth={isAuth}
            suggestFriends={suggestFriends}
          />
        </div>
        <div
          ref={scrollRef}
          className="col-span-2 space-y-5 md:col-span-1 lg:order-3"
        >
          <Outlet context={{ profile, isAuth, scrollRef }} />
        </div>
        <div className="col-span-1 md:col-span-1 lg:order-2 lg:col-span-2">
          <RecommendsTags />
        </div>
        <div className="col-span-1 hidden lg:block">
          <PossibleSubscribers
            handleFollow={handleFollow}
            isLoadingFollow={isLoadingFollow}
            suggestFriends={suggestFriends}
            isAuth={isAuth}
          />
        </div>
      </div>
    </>
  )
}
export default ProfileLayout
