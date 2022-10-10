import { Link } from 'react-router-dom'
import { MdImageNotSupported } from 'react-icons/md'

import { Notification } from './type'

const Notifications = ({ setIsOpenNotification, notifications }) => {
  return (
    <>
      <h2 className="mb-4">Ваши уведомления</h2>
      {!notifications.length && (
        <div className="flex h-[calc(100%-100px)] items-center justify-center">
          <p className="font-semibold text-sky-500">Нет уведомлений</p>
        </div>
      )}
      <div
        className="flex-col space-y-4 overflow-hidden"
        onClick={() => setIsOpenNotification((prev) => !prev)}
      >
        {notifications.map((item: Notification, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-sm bg-gray-200 p-2 md:space-x-2"
          >
            <div className="basis-1/4 md:basis-1/2">
              {item.author.avatarUrl ? (
                <img
                  src={item.author.avatarUrl}
                  className="mx-auto h-10 w-10 rounded-full object-cover"
                  alt={item.author.fullname}
                />
              ) : (
                <MdImageNotSupported className="mx-auto h-10 w-10 rounded-full text-black" />
              )}
            </div>
            <Link
              to={`/post/${item.post.id}`}
              className="line-clamp-3 font-light hover:text-sky-500"
            >
              {item.author.fullname} оставил комментарий на пост{' '}
              {item.post.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
export default Notifications
