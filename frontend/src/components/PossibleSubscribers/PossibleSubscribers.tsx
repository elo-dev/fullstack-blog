import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'

import { PossibleSubscribersProps } from './type'

const PossibleSubscribers = ({
  handleFollow,
  isLoadingFollow,
  suggestFriends,
  isAuth,
}: PossibleSubscribersProps) => {
  return (
    <div className="space-y-5 overflow-auto rounded-md bg-white p-5 shadow-md dark:bg-opacity-90">
      <p>Возможные подписки</p>
      {suggestFriends?.map((friend) => (
        <div
          key={friend._id}
          className="flex items-center justify-between space-x-3"
        >
          <Link to={`/profile/${friend._id}`} className="shrink-0">
            {friend.avatarUrl ? (
              <img
                src={friend.avatarUrl}
                alt={friend.fullname}
                className="h-[52px] w-[52px] rounded-full object-cover xl:h-[42px] xl:w-[42px]"
              />
            ) : (
              <CgProfile className="h-[52px] w-[52px] rounded-full object-cover xl:h-[42px] xl:w-[42px]" />
            )}
          </Link>
          <Link
            to={`/profile/${friend._id}`}
            className="truncate text-lg xl:text-base"
          >
            {friend.fullname}
          </Link>
          {isAuth && (
            <button
              onClick={() => handleFollow(friend)}
              className="h-10 w-10 shrink-0 rounded-full bg-sky-500 font-bold text-white hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500 md:text-base"
              disabled={isLoadingFollow}
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
export default PossibleSubscribers
