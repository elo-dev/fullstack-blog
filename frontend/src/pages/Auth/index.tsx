import { Navigate, Outlet } from 'react-router'

import Back from '@components/Back/Back'

import { useAppSelector } from '@hooks/index'

import { currentUser } from '@services/slices/userSlice'

const Auth = () => {
  const { user } = useAppSelector(currentUser)

  if (localStorage.getItem('token') || user) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <Back />
      <Outlet />
    </div>
  )
}
export default Auth
