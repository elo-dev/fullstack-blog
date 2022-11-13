import { Link, Navigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { VscLoading } from 'react-icons/vsc'

import PossibleSubscribers from '@components/PossibleSubscribers/PossibleSubscribers'

import { SidebarProps } from './type'

const Sidebar = ({
  authUser,
  userProfile,
  scrollRef,
  handleFollow,
  handleUnfollow,
  isLoadingFollow,
  isLoadingUnfollow,
}: SidebarProps) => {
  if (!userProfile) return <Navigate to={'/'} />

  return (
    <>
      <div className="space-y-4 rounded-md bg-white p-5 text-center shadow-md">
        {userProfile.avatarUrl ? (
          <img
            src={userProfile.avatarUrl}
            alt="avatar"
            className="mx-auto h-[72px] w-[72px] rounded-full object-cover"
          />
        ) : (
          <CgProfile className="mx-auto h-[72px] w-[72px] rounded-full object-cover" />
        )}
        <h1 className="text-lg">{userProfile.fullname}</h1>
        {userProfile.aboutMe && (
          <p className="line-clamp-2">{userProfile.aboutMe}</p>
        )}
        <div className="grid grid-cols-2 divide-x">
          <Link
            to={'subscriptions'}
            onClick={() => scrollRef.current.scrollIntoView()}
          >
            <p>{userProfile.following.length}</p>
            <p className="text-gray-400">Подписки</p>
          </Link>
          <Link
            to={'followers'}
            onClick={() => scrollRef.current.scrollIntoView()}
          >
            <p>{userProfile.followers.length}</p>
            <p className="text-gray-400">Подписчики</p>
          </Link>
        </div>
        {authUser &&
          (!authUser?.following?.includes(userProfile?._id) ? (
            authUser?._id !== userProfile?._id && (
              <button
                onClick={() => handleFollow()}
                className="w-full rounded-md bg-sky-500 py-2 text-white hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500"
                disabled={isLoadingFollow}
              >
                <div className="flex items-center justify-center space-x-2">
                  <p>Подписаться</p>
                  {isLoadingFollow && <VscLoading className="animate-spin" />}
                </div>
              </button>
            )
          ) : (
            <button
              onClick={() => handleUnfollow()}
              className="w-full rounded-md bg-sky-500 py-2 text-white hover:opacity-80 disabled:bg-gray-500"
              disabled={isLoadingUnfollow}
            >
              <div className="flex items-center justify-center space-x-2">
                <p>Отписаться</p>
                {isLoadingUnfollow && <VscLoading className="animate-spin" />}
              </div>
            </button>
          ))}
      </div>
      <div className="lg:hidden">
        <PossibleSubscribers
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          isLoadingFollow={isLoadingFollow}
          isLoadingUnfollow={isLoadingUnfollow}
        />
      </div>
    </>
  )
}
export default Sidebar
