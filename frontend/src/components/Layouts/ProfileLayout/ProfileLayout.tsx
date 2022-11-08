import { useRef } from 'react'
import { Outlet, useParams } from 'react-router'

import Back from '../../Back/Back'
import RecommendsTags from '../../../pages/Profile/RecommendsTags'
import Sidebar from '../../../pages/Profile/Sidebar'
import NotFound from '../../../pages/NotFound/NotFound'
import PossibleSubscribers from '../../PossibleSubscribers/PossibleSubscribers'
import Loader from '../../Loader/Loader'

import { useAppSelector } from '../../../hooks'

import {
  useFollowMutation,
  useGetProfileQuery,
  useUnfollowMutation,
} from '../../../services/query/profile'
import { currentUser, selectIsAuth } from '../../../services/slices/userSlice'

const ProfileLayout = () => {
  const { id } = useParams()
  const { data: profile, isLoading, error } = useGetProfileQuery(id)
  const isAuth = useAppSelector(selectIsAuth)
  const { user } = useAppSelector(currentUser)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation()
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowMutation()

  const handleFollow = async (id?: string) => {
    if (id) {
      await follow(id).unwrap()
    } else {
      await follow(profile._id).unwrap()
    }
  }

  const handleUnfollow = async (id?: string) => {
    if (id) {
      await unfollow(id).unwrap()
    } else {
      await unfollow(profile._id).unwrap()
    }
  }

  if (isLoading) return <Loader />
  if (error) return <NotFound error={error} />

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
            handleUnfollow={handleUnfollow}
            isLoadingFollow={isLoadingFollow}
            isLoadingUnfollow={isLoadingUnfollow}
          />
        </div>
      </div>
    </>
  )
}
export default ProfileLayout
