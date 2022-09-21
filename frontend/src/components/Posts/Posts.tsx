import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { IoIosEye } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { MdImageNotSupported } from 'react-icons/md'

import { PostItem } from '../../types/Post'

import { timeTransform } from '../../utilts/timeTransform'

const Posts = ({
  _id,
  author,
  text,
  title,
  createdAt,
  viewsCount,
  imageUrl,
  tags,
}: PostItem) => {
  const { createdDate, isCreatedToday, todayTime } = timeTransform(createdAt)

  return (
    <Fragment key={_id}>
      <div className="relative flex flex-col space-y-5">
        <div className="h-[300px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <MdImageNotSupported className="h-full w-full rounded-xl object-cover text-black" />
          )}
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center space-y-2 md:flex-row">
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt={author.fullname}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <CgProfile className="h-10 w-10 rounded-full text-black" />
              )}
              <p className="text-center text-slate-500 md:ml-3">
                {author.fullname}
              </p>
            </div>
            <p className="text-right text-slate-500">
              {isCreatedToday ? todayTime : createdDate}
            </p>
          </div>
          <p className="line-clamp-2 text-5xl font-semibold md:text-3xl">
            <Link
              to={`post/${_id}`}
              className="before:absolute before:top-0 before:left-0 before:h-full before:w-full before:content-[''] hover:text-sky-500"
            >
              {title}
            </Link>
          </p>
          <ReactMarkdown
            children={text}
            className="line-clamp-2 font-medium text-slate-500"
          />
          <ul className="line-clamp-1">
            {tags?.map((tag, index) => (
              <li
                key={index}
                className="mr-2 inline-block font-medium text-slate-400"
              >
                #{tag}
              </li>
            ))}
          </ul>
          <p className="flex items-center space-x-1 text-slate-400">
            <IoIosEye />
            <span>{viewsCount}</span>
          </p>
        </div>
      </div>
    </Fragment>
  )
}
export default Posts
