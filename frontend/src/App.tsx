import Layout from './components/Layout'
import Header from './components/Header/Header'
import Filters from './components/Filters/Filters'
import Posts from './components/Posts/Posts'

const App = () => {
  return (
    <Layout>
      <Header />
      <Filters />
      <Posts />
    </Layout>
  )
}

export default App
