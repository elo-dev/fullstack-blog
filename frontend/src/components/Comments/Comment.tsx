import { useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { GrEmoji } from 'react-icons/gr'

import useClickOutside from '../../hooks/useClickOutside'

const Comment = ({ author, emoji, text, createdAt, onEmojiClick }) => {
  const rootEl = useRef(null)
  const { isOpen, setIsOpen } = useClickOutside(rootEl)

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
        <p ref={rootEl} onClick={() => setIsOpen(!isOpen)}>
          <GrEmoji size={20} className="cursor-pointer hover:text-sky-500" />
        </p>
        {isOpen && (
          <div className="light-0 absolute bottom-[100%]">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              disableSkinTonePicker
              disableSearchBar
            />
          </div>
        )}
        <p className="text-lg">{emoji}</p>
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
