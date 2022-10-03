import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { GrEmoji } from 'react-icons/gr'

import useClickOutside from '../../hooks/useClickOutside'
import { instance } from '../../instance'
import { useAppSelector } from '../../hooks'

const Comment = ({ id, author, emojis, text, createdAt }) => {
  const [emoji, setEmoji] = useState({})
  const rootEl = useRef(null)
  const { isOpen, setIsOpen } = useClickOutside(rootEl)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const emojiCount = emojis.reduce((acc, el) => {
      acc[el.emoji] = (acc[el.emoji] || 0) + 1
      return acc
    }, {})

    setEmoji(emojiCount)
  }, [])

  const onEmojiClick = async (event, emojiObject) => {
    try {
      const { data } = await instance.patch('/comment/emoji', {
        id,
        emoji: emojiObject.emoji,
      })

      const emojiCount = data.reduce((acc, el) => {
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
      <div className="flex items-center space-x-2">
        <img
          src={author.avatarUrl}
          alt={author.fullname}
          className="h-10 w-10 rounded-full object-cover"
        />
        <p>{author.fullname}</p>
      </div>
      <p>{text}</p>
      <div className="relative flex items-center space-x-3">
        {user && (
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