import { Link } from 'react-router-dom'
import { IoIosEye } from 'react-icons/io'
import { PostItem } from '../../types/Post'

const Posts = ({
  _id,
  author,
  text,
  title,
  createdAt,
  viewsCount,
  tags,
}: PostItem) => {
  return (
    <div
      key={_id}
      className="group relative flex cursor-pointer flex-col gap-10 first:col-span-full first:flex-row hover:text-sky-500 sm:col-span-1 sm:flex-col sm:gap-5 md:col-span-2 md:flex-col md:first:flex-col"
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
          <p className="basis-1/2 text-right text-slate-500">{createdAt}</p>
        </div>
        <p className="line-clamp-2 text-5xl font-semibold md:text-3xl">
          <Link
            to={`post/${_id}`}
            className="before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:content-['']"
          >
            {title}
          </Link>
        </p>
        <p className="line-clamp-2 font-medium text-slate-500">{text}</p>
        <ul className="line-clamp-1">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="mr-2 inline-block font-medium text-slate-400"
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
}
export default Posts