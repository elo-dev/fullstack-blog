import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import { RiUserUnfollowLine } from 'react-icons/ri'
import { FaUserFriends } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import { useAppSelector } from '../../hooks'

import { useUnfollowMutation } from '../../services/query/profile'
import { currentUser } from '../../services/slices/userSlice'

import { UserListProps } from './types'

const UserList = ({
  _id,
  aboutMe,
  avatarUrl,
  fullname,
  profileId,
}: UserListProps) => {
  const [isUserMenu, setIsUserMenu] = useState(false)
  const [unfollow, { isLoading }] = useUnfollowMutation()
  const { user } = useAppSelector(currentUser)

  const handleUnfollow = async () => {
    await unfollow(_id).unwrap()
  }

  return (
    <li className="relative flex space-x-5 py-3">
      <Link to={`/profile/${_id}`} className="h-24 w-24">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullname}
            className="h-full w-full flex-grow-0 rounded-full object-cover"
          />
        ) : (
          <CgProfile className="mx-auto h-24 w-24 rounded-full object-cover" />
        )}
      </Link>
      <div className="flex-1">
        <Link
          to={`/profile/${_id}`}
          className="pt-2 font-medium hover:text-sky-500"
        >
          {fullname}
        </Link>
        <p className="truncate text-sm text-gray-500 sm:max-w-[85%]">
          {aboutMe}
        </p>
        <BsThreeDots
          size="20"
          className="absolute right-0 top-3 cursor-pointer md:hidden"
          onMouseEnter={() => setIsUserMenu(true)}
        />
        <div className="absolute right-0 top-3 hidden space-y-3 md:block">
          <Link to={`/profile/${_id}/subscriptions`}>
            <FaUserFriends
              size="25"
              className="cursor-pointer hover:text-sky-500"
            />
          </Link>
          {profileId === user?._id && (
            <button onClick={handleUnfollow} disabled={isLoading}>
              <RiUserUnfollowLine
                size="25"
                className="cursor-pointer hover:text-red-500"
              />
            </button>
          )}
        </div>
        {isUserMenu && (
          <div
            className="absolute top-8 right-0 flex flex-col divide-y bg-gray-100 px-2 shadow-md"
            onMouseLeave={() => setIsUserMenu(false)}
          >
            <Link
              to={`/profile/${_id}/subscriptions`}
              className="cursor-pointer py-2 hover:text-sky-500"
            >
              Посмотреть подписки
            </Link>
            {profileId === user._id && (
              <button
                onClick={handleUnfollow}
                className="cursor-pointer py-2 hover:text-red-500"
                disabled={isLoading}
              >
                Отписаться
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
export default UserList
