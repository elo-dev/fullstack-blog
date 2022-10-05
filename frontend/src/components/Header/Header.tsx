import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { IoIosNotifications, IoIosArrowDown, IoIosSearch } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'

import { logout, selectIsAuth } from '../../services/slices/auth'
import { fetchSearchedPosts } from '../../services/slices/posts'
import useClickOutside from '../../hooks/useClickOutside'

const Header = () => {
  const [searchParams] = useSearchParams()
  const term = searchParams.get('term') || ''

  const [searchTerm, setSearchTerm] = useState(term)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState([])

  const isAuth = useAppSelector(selectIsAuth)
  const user = useAppSelector((state) => state.auth.user)
  const rootEl = useRef(null)
  const { isOpen, setIsOpen } = useClickOutside(rootEl)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    setIsOpen(false)
  }

  useEffect(() => {
    if (searchTerm.length) {
      dispatch(fetchSearchedPosts(searchTerm))
    }
  }, [])

  const handlerSearchPost = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      navigate({ pathname: '/', search: `term=${searchTerm}` })
      await dispatch(fetchSearchedPosts(searchTerm))
      setIsLoading(false)
    } catch (error) {
      setSubmitError(error.response.data)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between py-5 md:flex-col md:space-y-5">
      <form
        onSubmit={handlerSearchPost}
        className="flex w-[50%] items-center rounded-full border border-sky-500 bg-slate-200 px-2 transition duration-100 ease-in-out focus-within:border-sky-600 focus-within:bg-white sm:w-full"
      >
        <IoIosSearch size="25" />
        <input
          type="text"
          disabled={isLoading}
          className="w-full bg-transparent p-1.5 focus:outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {submitError?.map(({ message }, index) => (
        <p key={index}>{message}</p>
      ))}
      <div className="flex items-center space-x-3">
        {isAuth ? (
          <>
            {user.avatarUrl ? (
              <img
                className="h-[42px] w-[42px] cursor-pointer rounded-[50%] border-2 border-transparent object-cover hover:border-sky-500"
                src={user.avatarUrl}
              />
            ) : (
              <CgProfile className="h-10 w-10 rounded-full text-black" />
            )}
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
                  <Link
                    to="settings"
                    className="flex cursor-pointer items-center justify-center whitespace-nowrap px-2 py-1 hover:bg-slate-100 hover:text-sky-500"
                  >
                    Настройки
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
