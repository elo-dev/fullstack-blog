import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EmojiPicker, { IEmojiData } from 'emoji-picker-react'
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

  const onEmojiClick = async (event: any, emojiObject: IEmojiData) => {
    try {
      const { data } = await instance.patch<IEmojiData[]>('/comment/emoji', {
        id: _id,
        emoji: emojiObject.emoji,
      })

      const emojiCount = data.reduce((acc: any, el) => {
        acc[el.emoji] = (acc[el.emoji] || 0) + 1
        return acc
      }, {})

      setEmoji(emojiCount)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-3 border-b border-slate-400 pb-2">
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
          <CgProfile className="h-10 w-10 rounded-full text-black" />
        )}
        <p>{author.fullname}</p>
      </Link>
      <p>{text}</p>
      <div className="relative flex items-center space-x-3">
        {isAuth && (
          <p ref={rootEl} onClick={() => setIsOpen(!isOpen)}>
            <GrEmoji size={20} className="cursor-pointer hover:text-sky-500" />
          </p>
        )}
        {isOpen && (
          <div className="light-0 absolute bottom-[100%]">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              disableSkinTonePicker
              disableSearchBar
            />
          </div>
        )}
        {Object.entries(emoji).map(([item, val], index) => (
          <p
            key={index}
            className="text-sm text-gray-600"
          >{`${item} ${val}`}</p>
        ))}
        <p className="opacity-40">
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
