import { useState } from 'react'
import { useOutletContext } from 'react-router'
import { FiSearch } from 'react-icons/fi'

import UserList from '@components/UserList/UserList'

import { ContextType } from '@myTypes/Context'

const SubscriptionsList = () => {
  const [value, setValue] = useState('')
  const { profile } = useOutletContext<ContextType>()

  const filtredUsers = profile.following.filter((user) =>
    user.fullname.toLowerCase().includes(value.toLowerCase().trim())
  )

  return (
    <div className="rounded-md bg-white shadow-md dark:bg-opacity-90">
      <form className="flex items-center border-b border-gray-200 dark:border-slate-300">
        <FiSearch size="25" className="mx-3" />
        <input
          type="text"
          placeholder="Поиск"
          className="w-full bg-transparent p-3 pl-0 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {!profile.following.length ? (
        <p className="py-5 text-center">Нет подписок</p>
      ) : filtredUsers.length ? (
        <ul className="mx-5 divide-y dark:divide-slate-300">
          {filtredUsers.map(({ _id, fullname, avatarUrl, aboutMe }) => (
            <UserList
              key={_id}
              _id={_id}
              fullname={fullname}
              avatarUrl={avatarUrl}
              aboutMe={aboutMe}
              profileId={profile._id}
            />
          ))}
        </ul>
      ) : (
        <div className="py-5 px-12 text-center">
          <p className="overflow-hidden text-ellipsis whitespace-pre">
            По запросу <span className="font-medium">{value}</span>
          </p>
          <p>не найдено ни одной подписки.</p>
        </div>
      )}
    </div>
  )
}
export default SubscriptionsList
