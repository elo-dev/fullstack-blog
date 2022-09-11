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
      <div className="mt-12 mb-5 grid grid-cols-3 gap-y-16 gap-x-10 sm:grid-cols-1 md:grid-cols-2">
        {posts.items.map((post) => (
          <Posts key={post._id} {...post} />
        ))}
      </div>
    </>
  )
}
export default HomePage
