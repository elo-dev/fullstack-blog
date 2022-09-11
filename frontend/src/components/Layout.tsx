import { Outlet } from 'react-router'
import Header from '../components/Header/Header'

const Layout = () => {
  return (
    <div className="container mx-auto max-w-full px-7">
      <Header />
      <Outlet />
    </div>
  )
}
export default Layout
