import { useEffect } from 'react'
import { IoIosEye } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchPosts } from '../../services/slices/posts'

const Posts = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div>
      <h1 className="text-8xl font-semibold md:text-7xl">The Blog</h1>
      <div className="my-12 grid grid-cols-3 gap-y-16 gap-x-10 sm:grid-cols-1 md:grid-cols-2">
        {posts.items.map(
          ({ _id, author, text, title, createdAt, viewsCount, tags }) => (
            <div
              key={_id}
              className="group flex cursor-pointer flex-col gap-10 first:col-span-full first:flex-row hover:text-sky-500 sm:col-span-1 sm:flex-col sm:gap-5 md:col-span-2 md:flex-col md:first:flex-col"
            >
              <img
                src="https://images.unsplash.com/photo-1662548293729-0da75f4178d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="img"
                className="w-full rounded-xl group-first:w-[50%] group-first:basis-1/2 md:group-first:w-full"
              />
              <div className="flex flex-col justify-around gap-5 group-first:basis-1/2 group-first:gap-0 md:group-first:gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center gap-y-2 md:flex-row">
                    <img
                      src={author.avatarUrl}
                      alt={author.fullname}
                      className="mx-auto h-10 w-10 rounded-full"
                    />
                    <p className="text-center text-slate-500 md:ml-3">
                      {author.fullname}
                    </p>
                  </div>
                  <p className="basis-1/2 text-right text-slate-500">
                    {createdAt}
                  </p>
                </div>
                <p className="line-clamp-2 text-5xl font-semibold md:text-3xl">
                  {title}
                </p>
                <p className="line-clamp-2 font-medium text-slate-500">
                  {text}
                </p>
                <ul className="line-clamp-1">
                  {tags.map((tag, index) => (
                    <li
                      key={index}
                      className="mr-2 inline-block font-medium text-slate-400 hover:text-slate-600"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-x-1 text-slate-400">
                  <IoIosEye />
                  {viewsCount}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
export default Posts
