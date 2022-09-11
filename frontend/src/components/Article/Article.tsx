import { IoIosEye } from 'react-icons/io'
import { PostItem } from '../../types/Post'

const Article = ({
  _id,
  author,
  createdAt,
  tags,
  text,
  title,
  viewsCount,
}: PostItem) => {
  return (
    <div key={_id} className="overflow-hidden rounded-t-lg bg-white">
      <img
        src="https://images.unsplash.com/photo-1662404426135-27525a4cc993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
        alt={title}
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
            <p className="text-slate-400">{createdAt}</p>
          </div>
        </div>
        <div className="px-10">
          <h1 className="my-5 text-5xl font-semibold">{title}</h1>
          <ul>
            {tags.map((tag, index) => (
              <li
                key={index}
                className="mr-2 inline-block text-slate-400 last:mr-0"
              >
                #{tag}
              </li>
            ))}
          </ul>
          <p className="my-5 font-medium text-slate-500">{text}</p>
          <p className="flex items-center gap-x-1 text-slate-400">
            <IoIosEye />
            {viewsCount}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Article
