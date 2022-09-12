import { Navigate, Outlet } from 'react-router'

import Back from '../../components/Back/Back'

import { selectIsAuth } from '../../services/slices/auth'
import { useAppSelector } from '../../hooks'

const Auth = () => {
  const isAuth = useAppSelector(selectIsAuth)

  if (isAuth) {
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
