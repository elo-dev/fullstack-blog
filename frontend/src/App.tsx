import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

import HomePage from '@pages/HomePage/HomePage'
import ArticlePage from '@pages/ArticlePage/ArticlePage'
import Auth from '@pages/Auth'
import LoginPage from '@pages/Auth/LoginPage/LoginPage'
import RegistrationPage from '@pages/Auth/RegistrationPage/RegistrationPage'
import Settings from '@pages/Settings/Settings'
import NotFound from '@pages/NotFound/NotFound'
import Profile from '@pages/Profile/Profile'

import Layout from '@components/Layouts/MainLayout/MainLayout'
import Loader from '@components/Loader/Loader'

import { useAuthMeQuery } from './services/query/user'

const ProfileLayout = lazy(
  () => import('@components/Layouts/ProfileLayout/ProfileLayout')
)

const MarkdownEditor = lazy(
  () => import('@pages/MarkdownEditor/MarkdownEditor')
)

const SubscriptionsList = lazy(
  () => import('@components/SubscriptionsList/SubscriptionsList')
)

const FollowersList = lazy(
  () => import('@components/FollowersList/FollowersList')
)

const App = () => {
  useAuthMeQuery()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="post/:id" element={<ArticlePage />} />
        <Route
          path="post/:id/edit"
          element={
            <Suspense fallback={<Loader />}>
              <MarkdownEditor />
            </Suspense>
          }
        />
        <Route
          path="create-post"
          element={
            <Suspense fallback={<Loader />}>
              <MarkdownEditor />
            </Suspense>
          }
        />
        <Route path="auth" element={<Auth />}>
          <Route index element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
        <Route
          path="profile/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProfileLayout />
            </Suspense>
          }
        >
          <Route index element={<Profile />} />
          <Route
            path="subscriptions"
            element={
              <Suspense fallback={<Loader />}>
                <SubscriptionsList />
              </Suspense>
            }
          />
          <Route
            path="followers"
            element={
              <Suspense fallback={<Loader />}>
                <FollowersList />
              </Suspense>
            }
          />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route
          path="*"
          element={
            <NotFound
              error={{
                status: '404',
                data: [{ message: 'Страница не найдена' }],
              }}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App
