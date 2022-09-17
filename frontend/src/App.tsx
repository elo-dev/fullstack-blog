import { useEffect } from 'react'
import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage/HomePage'
import ArticlePage from './pages/ArticlePage/ArticlePage'
import Auth from './pages/Auth'
import LoginPage from './pages/Auth/LoginPage/LoginPage'
import RegistrationPage from './pages/Auth/RegistrationPage/RegistrationPage'
import MarkdownEditor from './pages/MarkdownEditor/MarkdownEditor'
import NotFound from './pages/NotFound/NotFound'

import Layout from './components/Layout'

import { useAppDispatch } from './hooks'
import { fetchAuthMe } from './services/slices/auth'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="post/:id" element={<ArticlePage />} />
        <Route path="post/:id/edit" element={<MarkdownEditor />} />
        <Route path="create-post" element={<MarkdownEditor />} />
        <Route path="auth" element={<Auth />}>
          <Route index element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
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
