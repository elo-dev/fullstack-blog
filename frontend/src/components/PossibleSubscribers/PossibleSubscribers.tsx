import { Link } from 'react-router-dom'

import { CgProfile } from 'react-icons/cg'

import {
  useFollowMutation,
  useGetSuggestedFriendsQuery,
  useUnfollowMutation,
} from '../../services/query/profile'
import { currentUser, selectIsAuth } from '../../services/slices/userSlice'
import { useAppSelector } from '../../hooks'

const PossibleSubscribers = () => {
  const { data: suggestFriends } = useGetSuggestedFriendsQuery()
  const { user } = useAppSelector(currentUser)
  const isAuth = useAppSelector(selectIsAuth)
  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation()
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowMutation()

  const handleFollow = async (_id: string) => {
    await follow(_id).unwrap()
  }

  const handleUnfollow = async (_id: string) => {
    await unfollow(_id).unwrap()
  }

  return (
    <div className="h-fit space-y-5 overflow-auto rounded-md bg-white p-5 shadow-md lg:basis-full xl:max-h-56">
      <p>Возможные подписки</p>
      {isAuth &&
        suggestFriends?.map(({ _id, avatarUrl, fullname }) => (
          <div
            key={_id}
            className="flex items-center justify-between space-x-4"
          >
            <Link
              to={`/profile/${_id}`}
              className="flex items-center space-x-2"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullname}
                  className="h-[52px] w-[52px] rounded-full object-cover xl:h-[42px] xl:w-[42px]"
                />
              ) : (
                <CgProfile className="h-[52px] w-[52px] rounded-full object-cover xl:h-[42px] xl:w-[42px]" />
              )}
              <p className="truncate text-center text-lg">{fullname}</p>
            </Link>
            {user ? (
              <div>
                <button
                  onClick={() => handleFollow(_id)}
                  className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold text-white hover:opacity-80 disabled:bg-gray-500 md:text-base"
                  disabled={isLoadingFollow}
                >
                  +
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => handleUnfollow(_id)}
                  className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold text-white hover:opacity-80 disabled:bg-gray-500 md:text-base"
                  disabled={isLoadingUnfollow}
                >
                  -
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
export default PossibleSubscribers
