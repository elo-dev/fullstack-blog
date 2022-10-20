import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import Sidebar from './Sidebar'
import MainContent from './MainContent'
import NotFound from '../NotFound/NotFound'
import RecommendsTags from './RecommendsTags'

import Loader from '../../components/Loader/Loader'
import Back from '../../components/Back/Back'
import PossibleSubscribers from '../../components/PossibleSubscribers/PossibleSubscribers'

import { useAppSelector } from '../../hooks'

import { useGetProfileQuery } from '../../services/query/profile'
import { currentUser, selectIsAuth } from '../../services/slices/userSlice'

const Profile = () => {
  const { id } = useParams()
  const { data: profile, isLoading, error } = useGetProfileQuery(id)
  const { user } = useAppSelector(currentUser)
  const isAuth = useAppSelector(selectIsAuth)

  if (isLoading) return <Loader />
  if (error) return <NotFound error={error} />

  return (
    <>
      <Back />
      <div className="my-4 flex space-x-5 lg:flex-col lg:space-x-0 lg:space-y-5">
        <div className="basis-1/4 space-y-5 sm:flex-col sm:space-y-5 sm:space-x-0 lg:order-1 lg:flex lg:items-stretch lg:space-y-0 lg:space-x-5">
          <Sidebar authUser={user} userProfile={profile} />
        </div>
        <div className="basis-1/2 space-y-5 lg:order-3">
          {!!profile?.posts.length ? (
            profile?.posts?.map((post) => (
              <MainContent key={post._id} {...post} />
            ))
          ) : (
            <div className="flex h-full min-h-[100px] items-center justify-center text-center">
              {isAuth ? (
                <Link
                  to="/create-post"
                  className="text-lg font-bold text-sky-500"
                >
                  Создать пост
                </Link>
              ) : (
                <Link to="/auth">
                  <p className="text-lg font-bold text-sky-500">Авторизуйся</p>{' '}
                  создай свой первый пост
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="basis-1/4 lg:order-2">
          {user?._id === profile?._id ? (
            <RecommendsTags />
          ) : (
            <PossibleSubscribers />
          )}
        </div>
      </div>
    </>
  )
}
export default Profile
