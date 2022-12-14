import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { IoIosEye } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

import { timeTransform } from '@utils/timeTransform'

import { ArticleProps } from '@components/Article/type'

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
}: ArticleProps) => {
  const { createdDate, isCreatedToday, todayTime } = timeTransform(createdAt)

  return (
    <div
      key={_id}
      className="overflow-hidden rounded-t-lg bg-white dark:bg-opacity-90"
    >
      <img
        src={imageUrl ? imageUrl : ''}
        alt={imageUrl ? title : ''}
        className="max-h-[450px] w-full object-cover"
      />
      <div className="py-5">
        <Link
          to={`/profile/${author._id}`}
          className="ml-10 inline-flex cursor-pointer items-center space-x-2"
        >
          {author.avatarUrl ? (
            <img
              src={author.avatarUrl}
              alt={author.fullname}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <CgProfile className="h-10 w-10 rounded-full text-black" />
          )}
          <div>
            <p>{author.fullname}</p>
            <p className="text-slate-400 dark:text-slate-500">
              {isCreatedToday ? todayTime : createdDate}
            </p>
          </div>
        </Link>
        <div className="flex justify-between px-10">
          <div>
            <h1 className="my-5 text-5xl font-semibold">{title}</h1>
            <ul>
              {tags?.tag?.map((item, index) => (
                <li
                  key={index}
                  className="mr-2 inline-block text-slate-400 last:mr-0 dark:text-slate-500"
                >
                  #{item}
                </li>
              ))}
            </ul>
            <ReactMarkdown
              children={text}
              className="my-5 font-medium text-slate-500"
            />
            <p className="flex items-center space-x-1 text-slate-400 dark:text-slate-500">
              <IoIosEye />
              <span>{viewsCount}</span>
            </p>
          </div>
          {isEditable && (
            <div className="flex items-end space-x-3">
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
