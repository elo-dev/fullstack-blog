import { IoIosEye } from 'react-icons/io'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { MdDelete, MdEdit } from 'react-icons/md'

import { PostItem } from '../../types/Post'

import { timeTransform } from '../../utilts/timeTransform'

const Article = ({
  _id,
  author,
  createdAt,
  tags,
  text,
  title,
  imageUrl,
  viewsCount,
  isEditable,
  onRemoveArticle,
}: PostItem) => {
  const { createdDate, isCreatedToday, todayTime } = timeTransform(createdAt)

  return (
    <div key={_id} className="overflow-hidden rounded-t-lg bg-white">
      <img
        src={
          imageUrl
            ? `${
                process.env.REACT_APP_API_URL
                  ? process.env.REACT_APP_API_URL
                  : 'http://localhost:8888'
              }${imageUrl}`
            : null
        }
        alt={imageUrl ? title : null}
        className="max-h-[450px] w-full object-cover"
      />
      <div className="py-5">
        <div className="ml-10 inline-flex cursor-pointer items-center gap-x-2">
          <img
            src="https://images.unsplash.com/photo-1662404426135-27525a4cc993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt={author.fullname}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p>{author.fullname}</p>
            <p className="text-slate-400">
              {isCreatedToday ? todayTime : createdDate}
            </p>
          </div>
        </div>
        <div className="flex justify-between px-10">
          <div>
            <h1 className="my-5 text-5xl font-semibold">{title}</h1>
            <ul>
              {tags?.map((tag, index) => (
                <li
                  key={index}
                  className="mr-2 inline-block text-slate-400 last:mr-0"
                >
                  #{tag}
                </li>
              ))}
            </ul>
            <ReactMarkdown
              children={text}
              className="my-5 font-medium text-slate-500"
            />
            <p className="flex items-center gap-x-1 text-slate-400">
              <IoIosEye />
              {viewsCount}
            </p>
          </div>
          {isEditable && (
            <div className="flex items-end gap-x-3">
              <Link to={`/post/${_id}/edit`}>
                <MdEdit
                  size="25"
                  className="cursor-pointer hover:text-sky-500"
                />
              </Link>
              <MdDelete
                size="25"
                className="cursor-pointer hover:text-red-500"
                onClick={() => onRemoveArticle(_id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Article
