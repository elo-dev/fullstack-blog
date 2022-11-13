import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Filters from '@components/Filters/Filters'
import Posts from '@components/Posts/Posts'
import Loader from '@components/Loader/Loader'

import { useAppSelector } from '@hooks/index'

import { selectIsAuth } from '@services/slices/userSlice'
import {
  useGetFiltredByFriendsMutation,
  useGetFiltredByNewPostMutation,
  useGetFiltredByPopularPostMutation,
  useGetPostsQuery,
} from '@services/query/posts'

import { PostItem } from '@myTypes/Post'

const HomePage = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const { data, isLoading } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { posts: searchedPosts, loading } = useAppSelector(
    (state) => state.post
  )

  const navigation = useNavigate()

  const [posts, setPosts] = useState<PostItem[] | undefined>([])

  useEffect(() => {
    if (!searchedPosts.length) {
      setPosts(data)
    }
  }, [data])

  useEffect(() => {
    if (searchedPosts.length) {
      setPosts(searchedPosts)
    } else {
      setPosts(data)
    }
  }, [searchedPosts])

  const [filterNew, { isLoading: isLoadingFilterNew }] =
    useGetFiltredByNewPostMutation()
  const [filterPopular, { isLoading: isLoadingFilterPopular }] =
    useGetFiltredByPopularPostMutation()
  const [filterFriends, { isLoading: isLoadingFilterFriends }] =
    useGetFiltredByFriendsMutation()

  const onFilterNew = async () => {
    const data = await filterNew().unwrap()
    setPosts(data)
  }

  const onFilterPopular = async () => {
    const data = await filterPopular().unwrap()
    setPosts(data)
  }

  const onFilterFriends = async () => {
    if (!isAuth) {
      navigation('/auth')
    } else {
      const data = await filterFriends().unwrap()
      setPosts(data)
    }
  }

  if (
    isLoading ||
    isLoadingFilterNew ||
    isLoadingFilterPopular ||
    isLoadingFilterFriends ||
    loading
  )
    return <Loader />

  return (
    <>
      <Filters
        onFilterNew={onFilterNew}
        onFilterPopular={onFilterPopular}
        onFilterFriends={onFilterFriends}
      />
      <h1 className="text-8xl font-semibold md:text-7xl">The Blog</h1>
      {!posts?.length ? (
        <div className="grid h-[calc(100vh-285px)] items-center justify-center md:h-[calc(100vh-315px)]">
          <p className="text-xl font-bold sm:text-base">Нет постов</p>
        </div>
      ) : (
        <div className="my-12 grid grid-cols-3 gap-x-10 gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <Posts key={post._id} {...post} />
          ))}
        </div>
      )}
    </>
  )
}
export default HomePage
