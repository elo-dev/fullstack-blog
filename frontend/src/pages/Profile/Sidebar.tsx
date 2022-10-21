import { CgProfile } from 'react-icons/cg'

import PossibleSubscribers from '../../components/PossibleSubscribers/PossibleSubscribers'

import {
  useFollowMutation,
  useUnfollowMutation,
} from '../../services/query/profile'

import { SidebarProps } from './type'

const Sidebar = ({ authUser, userProfile }: SidebarProps) => {
  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation()
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowMutation()

  const handleFollow = async () => {
    await follow(userProfile._id).unwrap()
  }

  const handleUnfollow = async () => {
    await unfollow(userProfile._id).unwrap()
  }

  return (
    <>
      <div className="space-y-4 rounded-md bg-white p-5 text-center shadow-md lg:basis-full">
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
          <div>
            <p>{userProfile.following.length}</p>
            <p className="text-gray-400">Подписки</p>
          </div>
          <div>
            <p>{userProfile.followers.length}</p>
            <p className="text-gray-400">Подписчики</p>
          </div>
        </div>
        {authUser &&
          (!authUser?.following?.includes(userProfile?._id) ? (
            authUser?._id !== userProfile?._id && (
              <button
                onClick={handleFollow}
                className="w-full rounded-md bg-sky-500 py-2 text-white hover:opacity-80 disabled:bg-gray-500"
                disabled={isLoadingFollow}
              >
                Подписаться
              </button>
            )
          ) : (
            <button
              onClick={handleUnfollow}
              className="w-full rounded-md bg-sky-500 py-2 text-white hover:opacity-80 disabled:bg-gray-500"
              disabled={isLoadingUnfollow}
            >
              Отписаться
            </button>
          ))}
      </div>
      {authUser?._id === userProfile?._id && <PossibleSubscribers />}
    </>
  )
}
export default Sidebar
