import { Link } from 'react-router-dom'
import { IoIosEye } from 'react-icons/io'

import { PostItem } from '../../types/Post'
import { timeTransform } from '../../utilts/timeTransform'

const MainContent = ({
  _id,
  author,
  createdAt,
  imageUrl,
  text,
  title,
  viewsCount,
  tags,
}: PostItem) => {
  const { createdDate, isCreatedToday, todayTime } = timeTransform(createdAt)

  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-5 shadow-md">
      <div className="flex items-center space-x-2">
        <img
          src={author.avatarUrl}
          alt={author.fullname}
          className="h-[52px] w-[52px] rounded-full object-cover xl:h-[42px] xl:w-[42px]"
        />
        <div>
          <h3>{author.fullname}</h3>
          <span className="text-sm text-gray-500">
            {isCreatedToday ? todayTime : createdDate}
          </span>
        </div>
      </div>
      <Link
        to={`/post/${_id}`}
        className="[&_h4]:hover:text-sky-500 cursor-pointer space-y-3"
      >
        <h4 className="text-xl">{title}</h4>
        <p className="line-clamp-4">{text}</p>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="image"
            className="h-[200px] w-full rounded-md object-cover"
          />
        ) : null}
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <div className="flex items-center space-x-1">
            <IoIosEye />
            <span>{viewsCount}</span>
          </div>
          <ul className="line-clamp-1">
            {tags?.tag?.map((tag, index) => (
              <li
                key={index}
                className="mr-2 inline-block font-medium text-slate-400"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  )
}
export default MainContent
