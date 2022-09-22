import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { IoIosNotifications, IoIosArrowDown, IoIosSearch } from 'react-icons/io'

import { logout, selectIsAuth } from '../../services/slices/auth'
import useClickOutside from '../../hooks/useClickOutside'

const Header = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const user = useAppSelector((state) => state.auth.user)
  const rootEl = useRef(null)
  const { isOpen, setIsOpen } = useClickOutside(rootEl)

  const dispatch = useAppDispatch()

  const onClickLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-between space-y-5 py-5 md:flex-col">
      <div className="flex w-[50%] items-center rounded-full border border-sky-500 bg-slate-200 px-2 transition duration-100 ease-in-out focus-within:border-sky-600 focus-within:bg-white sm:w-full">
        <IoIosSearch size="25" />
        <input
          type="text"
          className="w-full bg-transparent p-1.5 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center space-x-3">
        {isAuth ? (
          <>
            <img
              className="h-[40px] w-[40px] cursor-pointer rounded-[50%] object-cover hover:outline hover:outline-sky-500"
              src="https://images.unsplash.com/photo-1662401208927-0b71a8635a84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            />
            <div className="flex items-center space-x-1">
              <p className="cursor-pointer hover:text-sky-500">
                {isAuth && user.fullname}
              </p>
              <nav className="relative" ref={rootEl}>
                <IoIosArrowDown
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer hover:text-sky-500"
                />
                <ul
                  className={`absolute right-[-30px] top-8 rounded-md bg-white p-2 drop-shadow-lg transition-all duration-300 ease-in-out ${
                    isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                  }`}
                >
                  <Link
                    to={'create-post'}
                    className="flex cursor-pointer items-center justify-center whitespace-nowrap px-2 py-1 hover:bg-slate-100 hover:text-sky-500"
                    onClick={() => setIsOpen((prevState) => !prevState)}
                  >
                    Создать статью
                  </Link>
                  <li
                    onClick={onClickLogout}
                    className="flex cursor-pointer items-center justify-center px-2 py-1 hover:bg-slate-100 hover:text-red-500"
                  >
                    Выйти
                  </li>
                </ul>
              </nav>
            </div>
            <IoIosNotifications
              size="25"
              className="cursor-pointer hover:text-sky-500"
            />
          </>
        ) : (
          <>
            <Link
              to={'auth'}
              className="rounded-md border border-sky-500 px-2 py-1 hover:text-sky-500"
            >
              Войти
            </Link>
            <Link
              to={'auth/registration'}
              className="rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-white hover:opacity-80 active:bg-sky-700"
            >
              Создать аккаунт
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
export default Header
