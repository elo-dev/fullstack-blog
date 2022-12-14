import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { IoIosNotifications, IoIosArrowDown, IoIosSearch } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { MdDarkMode } from 'react-icons/md'

import NotFound from '@pages/NotFound/NotFound'

import Notifications from '@components/Notifications/Notifications'

import useClickOutside from '@hooks/useClickOutside'
import { useAppDispatch, useAppSelector } from '@hooks/index'

import { fetchSearchedPosts } from '@services/slices/posts'
import { currentUser, logout } from '@services/slices/userSlice'
import { useGetNotificationQuery } from '@services/query/user'

import { ServerError } from '@myTypes/Error'

const Header = () => {
  const [searchParams] = useSearchParams()
  const term = searchParams.get('term') || ''

  const { user } = useAppSelector(currentUser)

  const [searchTerm, setSearchTerm] = useState(term)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<ServerError | null>(null)
  const [countNotification, setCountNotification] = useState<
    number | undefined
  >(0)
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    }
  }, [themeMode])

  const handleSwithTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setThemeMode('light')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    setCountNotification(user?.newNotifications.length)
  }, [user])

  const rootElMenu = useRef(null)
  const rootElNotification = useRef(null)

  const { isOpen: isOpenMenu, setIsOpen: setIsOpenMenu } =
    useClickOutside(rootElMenu)
  const { isOpen: isOpenNotification, setIsOpen: setIsOpenNotification } =
    useClickOutside(rootElNotification)

  useGetNotificationQuery(null, { skip: !isOpenNotification })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    setIsOpenMenu(false)
    navigate('/')
  }

  useEffect(() => {
    if (searchTerm.length) {
      dispatch(fetchSearchedPosts(searchTerm))
    }
  }, [])

  const openNotification = () => {
    setIsOpenNotification(!isOpenNotification)
    setCountNotification(0)
  }

  const handlerSearchPost = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      navigate({ pathname: '/', search: `term=${searchTerm}` })
      await dispatch(fetchSearchedPosts(searchTerm))
      setIsLoading(false)
    } catch (error: any) {
      setSubmitError(error.response.data)
      setIsLoading(false)
    }
  }

  if (submitError) return <NotFound error={submitError} />

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
          placeholder="?????????? ????????????"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <Link to={`profile/${user._id}`}>
              {user.avatarUrl ? (
                <img
                  className="h-[42px] w-[42px] cursor-pointer rounded-[50%] border-2 border-transparent object-cover hover:border-sky-500"
                  src={user.avatarUrl}
                />
              ) : (
                <CgProfile className="h-10 w-10 rounded-full text-black" />
              )}
            </Link>
            <div className="flex items-center space-x-1">
              <Link
                to={`profile/${user._id}`}
                className="max-w-[100px] cursor-pointer truncate hover:text-sky-500 dark:text-neutral-300 dark:hover:text-sky-500"
              >
                {user?.fullname}
              </Link>
              <nav className="relative" ref={rootElMenu}>
                <IoIosArrowDown
                  onClick={() => setIsOpenMenu((prev) => !prev)}
                  className="cursor-pointer hover:text-sky-500 dark:text-neutral-300 dark:hover:text-sky-500"
                />
                <ul
                  className={`absolute right-[-30px] top-8 rounded-md bg-white p-2 drop-shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-200 ${
                    isOpenMenu ? 'visible opacity-100' : 'invisible opacity-0'
                  }`}
                >
                  <Link
                    to={'create-post'}
                    className="flex cursor-pointer items-center justify-center whitespace-nowrap px-2 py-1 hover:bg-slate-100 hover:text-sky-500 dark:hover:bg-slate-200"
                    onClick={() => setIsOpenMenu((prevState) => !prevState)}
                  >
                    ?????????????? ????????????
                  </Link>
                  <Link
                    to="settings"
                    className="flex cursor-pointer items-center justify-center whitespace-nowrap px-2 py-1 hover:bg-slate-100 hover:text-sky-500 dark:hover:bg-slate-200"
                  >
                    ??????????????????
                  </Link>
                  <li
                    onClick={onClickLogout}
                    className="flex cursor-pointer items-center justify-center px-2 py-1 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-200"
                  >
                    ??????????
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <MdDarkMode
                size="25"
                className={`cursor-pointer ${
                  themeMode === 'dark' && 'fill-yellow-500'
                }  transition-colors duration-200 ease-in-out`}
                onClick={handleSwithTheme}
              />
            </div>
            <div className="relative" ref={rootElNotification}>
              <IoIosNotifications
                size="25"
                className="cursor-pointer hover:text-sky-500 dark:text-neutral-300 dark:hover:text-sky-500"
                onClick={openNotification}
              />
              {!!countNotification && (
                <span className="absolute right-[-8px] top-[-12px] flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 font-bold text-white">
                  {countNotification > 9 ? '9+' : countNotification}
                </span>
              )}
              <div
                className={`absolute right-0 top-10 z-50 h-[400px] w-[350px] overflow-auto rounded-md bg-white p-4 drop-shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-100 md:h-[350px] md:w-[300px] md:translate-x-[15%] ${
                  isOpenNotification
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                }`}
              >
                {isOpenNotification && (
                  <Notifications
                    setIsOpenNotification={setIsOpenNotification}
                    notifications={[
                      ...user.notifications,
                      ...user.newNotifications,
                    ]}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              to={'auth'}
              className="rounded-md border border-sky-500 px-2 py-1 hover:text-sky-500 dark:text-neutral-300"
            >
              ??????????
            </Link>
            <Link
              to={'auth/registration'}
              className="rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-white hover:opacity-80 active:bg-sky-700"
            >
              ?????????????? ??????????????
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
export default Header
