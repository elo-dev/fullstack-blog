import { Outlet } from 'react-router'
import Header from '@components/Header/Header'

const MainLayout = () => {
  return (
    <div className="container mx-auto max-w-full px-7">
      <Header />
      <Outlet />
    </div>
  )
}
export default MainLayout
