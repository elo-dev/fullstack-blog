import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'
import { GrEmoji } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'

import useClickOutside from '@hooks/useClickOutside'
import { useAppSelector } from '@hooks/index'

import { instance } from '../../instance'

import { selectIsAuth } from '@services/slices/userSlice'

import { IComment } from '@myTypes/Post'

const Comment = ({ _id, author, emojis, text, createdAt }: IComment) => {
  const [emoji, setEmoji] = useState({})
  const rootEl = useRef(null)
  const { isOpen, setIsOpen } = useClickOutside(rootEl)
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    const emojiCount = emojis.reduce((acc: any, el) => {
      acc[el.emoji] = (acc[el.emoji] || 0) + 1
      return acc
    }, {})

    setEmoji(emojiCount)
  }, [])

  const onEmojiClick = async (
    emojiObject: EmojiClickData,
    event: MouseEvent
  ) => {
    try {
      const { data } = await instance.patch<EmojiClickData[]>(
        '/comment/emoji',
        {
          id: _id,
          emoji: emojiObject.emoji,
        }
      )

      const emojiCount = data.reduce((acc: any, el) => {
        acc[el.emoji] = (acc[el.emoji] || 0) + 1
        return acc
      }, {})

      setEmoji(emojiCount)
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-3 py-5 last:pb-0">
      <Link
        to={`/profile/${author._id}`}
        className="inline-flex items-center space-x-2"
      >
        {author.avatarUrl ? (
          <img
            src={author.avatarUrl}
            alt={author.fullname}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <CgProfile className="h-10 w-10 rounded-full text-black dark:text-neutral-300" />
        )}
        <p className="dark:text-neutral-300">{author.fullname}</p>
      </Link>
      <p className="dark:text-neutral-300">{text}</p>
      <div className="relative flex items-center space-x-3">
        {isAuth && (
          <div ref={rootEl}>
            <GrEmoji
              size={20}
              className="cursor-pointer hover:text-sky-500 dark:text-neutral-300 dark:hover:text-sky-500"
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <div
              className={`light-0 absolute bottom-[100%] transition-all duration-300 ease-in-out ${
                isOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
            >
              <EmojiPicker
                theme={
                  localStorage.getItem('theme')?.includes('dark')
                    ? Theme.DARK
                    : Theme.LIGHT
                }
                searchDisabled
                skinTonesDisabled
                lazyLoadEmojis
                onEmojiClick={onEmojiClick}
              />
            </div>
          </div>
        )}
        {Object.entries(emoji).map(([item, val], index) => (
          <p
            key={index}
            className="text-sm text-gray-600 dark:text-neutral-300"
          >{`${item} ${val}`}</p>
        ))}
        <p className="opacity-40 dark:text-neutral-200">
          {new Date(createdAt).toLocaleString('ru', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}

export default Comment
