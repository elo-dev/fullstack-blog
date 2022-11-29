import { Link } from 'react-router-dom'
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
  suggestFriends,
  isAuth,
}: SidebarProps) => {
  if (!userProfile) return <VscLoading className="animate-spin" />
  return (
    <>
      <div className="space-y-4 rounded-md bg-white p-5 text-center shadow-md dark:bg-opacity-90">
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
        <div className="grid grid-cols-2 divide-x dark:divide-slate-300">
          <Link
            to={'subscriptions'}
            onClick={() => scrollRef.current.scrollIntoView()}
          >
            <p>{userProfile.following.length}</p>
            <p className="text-slate-400 dark:text-slate-500">Подписки</p>
          </Link>
          <Link
            to={'followers'}
            onClick={() => scrollRef.current.scrollIntoView()}
          >
            <p>{userProfile.followers.length}</p>
            <p className="text-slate-400 dark:text-slate-500">Подписчики</p>
          </Link>
        </div>
        {!authUser?.following.some((item) => item._id === userProfile._id) ? (
          authUser?._id !== userProfile._id && (
            <button
              onClick={() => handleFollow(userProfile)}
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
            onClick={() => handleUnfollow(userProfile._id)}
            className="w-full rounded-md bg-sky-500 py-2 text-white hover:opacity-80 disabled:bg-gray-500"
            disabled={isLoadingUnfollow}
          >
            <div className="flex items-center justify-center space-x-2">
              <p>Отписаться</p>
              {isLoadingUnfollow && <VscLoading className="animate-spin" />}
            </div>
          </button>
        )}
      </div>
      <div className="lg:hidden">
        {suggestFriends && (
          <PossibleSubscribers
            handleFollow={handleFollow}
            isLoadingFollow={isLoadingFollow}
            suggestFriends={suggestFriends}
            isAuth={isAuth}
          />
        )}
      </div>
    </>
  )
}
export default Sidebar
