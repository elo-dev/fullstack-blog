import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'

import { useAppSelector } from '@hooks/index'

import { useGetSuggestedFriendsQuery } from '@services/query/profile'
import { currentUser, selectIsAuth } from '@services/slices/userSlice'

import { PossibleSubscribersProps } from './type'

const PossibleSubscribers = ({
  handleFollow,
  handleUnfollow,
  isLoadingFollow,
  isLoadingUnfollow,
}: PossibleSubscribersProps) => {
  const { data: suggestFriends } = useGetSuggestedFriendsQuery()
  const { user } = useAppSelector(currentUser)
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <div className="h-fit space-y-5 overflow-auto rounded-md bg-white p-5 shadow-md dark:bg-opacity-90 xl:max-h-56">
      <p>Возможные подписки</p>
      {isAuth &&
        suggestFriends?.map(({ _id, avatarUrl, fullname }) => (
          <div
            key={_id}
            className="flex items-center justify-between space-x-3"
          >
            <Link
              to={`/profile/${_id}`}
              className="flex items-center space-x-3"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullname}
                  className="h-[52px] w-[52px] shrink-0 rounded-full object-cover xl:h-[42px] xl:w-[42px]"
                />
              ) : (
                <CgProfile className="h-[52px] w-[52px] shrink-0 rounded-full object-cover xl:h-[42px] xl:w-[42px]" />
              )}
              <p className="truncate text-lg xl:text-base">{fullname}</p>
            </Link>
            {user ? (
              <button
                onClick={() => handleFollow(_id)}
                className="h-10 w-10 shrink-0 rounded-full bg-sky-500 font-bold text-white hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500 md:text-base"
                disabled={isLoadingFollow}
              >
                +
              </button>
            ) : (
              <button
                onClick={() => handleUnfollow(_id)}
                className="h-10 w-10 shrink-0 rounded-full bg-sky-500 font-bold text-white hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500 md:text-base"
                disabled={isLoadingUnfollow}
              >
                -
              </button>
            )}
          </div>
        ))}
    </div>
  )
}
export default PossibleSubscribers
