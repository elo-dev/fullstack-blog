import { Route, Routes } from 'react-router'

import Layout from './components/Layout'
import HomePage from './pages/HomePage/HomePage'
import ArticlePage from './pages/ArticlePage/ArticlePage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="post/:id" element={<ArticlePage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Route>
    </Routes>
  )
}

export default App
