import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { fetchPosts } from '../../services/slices/posts'

import Filters from '../../components/Filters/Filters'
import Posts from '../../components/Posts/Posts'
import Loader from '../../components/Loader/Loader'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (posts.loading) return <Loader />

  return (
    <>
      <Filters />
      <h1 className="text-8xl font-semibold md:text-7xl">The Blog</h1>
      <div className="my-12 grid grid-cols-3 gap-x-10 gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.items.map((post) => (
          <Posts key={post._id} {...post} />
        ))}
      </div>
    </>
  )
}
export default HomePage
