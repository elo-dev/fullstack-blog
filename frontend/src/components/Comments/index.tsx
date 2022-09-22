import { useState } from 'react'

import Comment from './Comment'

import { instance } from '../../instance'
import { PostItem } from '../../types/Post'

const Comments = ({ _id, comments, user }: PostItem) => {
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comment, setComment] = useState(comments)
  const [error, setError] = useState([])

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await instance.post(`/posts/${_id}/comment`, {
        text: commentText,
      })

      comments.push(data)

      setComment(comments)
      setCommentText('')
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Комментарии</h2>
        <div className="flex space-x-3">
          <p className="cursor-pointer hover:text-sky-500">Последние</p>
          <p className="cursor-pointer hover:text-sky-500">Популярные</p>
        </div>
      </div>
      {user && (
        <form
          onSubmit={onSubmit}
          className="my-4 w-[40%] space-y-3 sm:w-full md:w-1/2"
        >
          <input
            type={'text'}
            className="w-full border border-sky-500 p-2 outline-none"
            placeholder="Комментарий"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type={'submit'}
            disabled={!commentText.length}
            className="rounded-md border border-sky-500 bg-sky-500 p-2 text-white hover:opacity-90 active:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Отправить
          </button>
          {error?.map(({ message }) => (
            <p className="text-red-500">{message}</p>
          ))}
        </form>
      )}
      <div className="space-y-5">
        {comment?.map(({ _id, author, emoji, text, createdAt }) => (
          <Comment
            key={_id}
            author={author}
            emoji={emoji}
            text={text}
            createdAt={createdAt}
            onEmojiClick={onEmojiClick}
          />
        ))}
      </div>
    </div>
  )
}
export default Comments
