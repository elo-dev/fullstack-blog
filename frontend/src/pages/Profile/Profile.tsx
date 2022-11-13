import { Link, useOutletContext } from 'react-router-dom'

import MainContent from './MainContent'

import { ContextType } from '@myTypes/Context'

const Profile = () => {
  const { profile, isAuth } = useOutletContext<ContextType>()

  return (
    <>
      {!!profile?.posts.length ? (
        profile?.posts?.map((post) => <MainContent key={post._id} {...post} />)
      ) : (
        <div className="flex h-full min-h-[100px] items-center justify-center text-center">
          {isAuth ? (
            <Link to="/create-post" className="text-lg font-bold text-sky-500">
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
    </>
  )
}
export default Profile
