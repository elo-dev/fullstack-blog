import { useState } from 'react'

import Comment from './Comment'

import { usePostCommentsMutation } from '../../services/query/posts'
import { PostItem } from '../../types/Post'

const Comments = ({ _id, comments, user }: PostItem) => {
  const [commentText, setCommentText] = useState('')
  const [comment, setComment] = useState(comments)
  const [addComment, { isLoading, error }] = usePostCommentsMutation()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const newComment = await addComment({
        _id,
        text: commentText.trim(),
      }).unwrap()
      setComment([...comment, newComment])
      setCommentText('')
    } catch (error) {}
  }

  const sortByNew = () => {
    const item = [...comment]
    const sorted = item.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setComment(sorted)
  }

  const sortByPopular = () => {
    const item = [...comment]
    const sorted = item.sort((a, b) => b.emojis.length - a.emojis.length)
    setComment(sorted)
  }

  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Комментарии</h2>
        <div className="flex space-x-3">
          <p onClick={sortByNew} className="cursor-pointer hover:text-sky-500">
            Последние
          </p>
          <p
            onClick={sortByPopular}
            className="cursor-pointer hover:text-sky-500"
          >
            Популярные
          </p>
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
            disabled={!commentText.length || isLoading}
            className="rounded-md border border-sky-500 bg-sky-500 p-2 text-white hover:opacity-90 active:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Отправить
          </button>
          {(error as any)?.data.map(({ message }, index) => (
            <p key={index} className="text-red-500">
              {message}
            </p>
          ))}
        </form>
      )}
      <div className="space-y-5">
        {comment?.map(({ _id, author, emojis, text, createdAt }) => (
          <Comment
            key={_id}
            id={_id}
            author={author}
            emojis={emojis}
            text={text}
            createdAt={createdAt}
          />
        ))}
      </div>
    </div>
  )
}
export default Comments
