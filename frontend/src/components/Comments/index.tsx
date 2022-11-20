import { useEffect, useState } from 'react'

import Comment from './Comment'

import { CommentsProps } from '@components/Comments/types'

import { usePostCommentsMutation } from '@services/query/posts'

import { IComment } from '@myTypes/Post'
import { ServerError } from '@myTypes/Error'

const Comments = ({ _id, comments, user }: CommentsProps) => {
  const [commentText, setCommentText] = useState('')
  const [comment, setComment] = useState<IComment[] | undefined>([])
  const [addComment, { isLoading, error }] = usePostCommentsMutation()

  useEffect(() => {
    setComment(comments)
  }, [comments])

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const newComment = await addComment({
        _id,
        text: commentText.trim(),
      }).unwrap()
      setComment([...(comment as IComment[]), newComment])
      setCommentText('')
    } catch (error) {}
  }

  const sortByNew = () => {
    const item = [...(comment as IComment[])]
    const sorted = item.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setComment(sorted)
  }

  const sortByPopular = () => {
    const item = [...(comment as IComment[])]
    const sorted = item.sort((a, b) => b.emojis.length - a.emojis.length)
    setComment(sorted)
  }

  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium dark:text-neutral-300">
          Комментарии
        </h2>
        <div className="flex space-x-3">
          <p
            onClick={sortByNew}
            className="cursor-pointer hover:text-sky-500 dark:text-neutral-300 dark:hover:text-sky-500"
          >
            Последние
          </p>
          <p
            onClick={sortByPopular}
            className="cursor-pointer hover:text-sky-500 dark:text-neutral-300 dark:hover:text-sky-500"
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
            disabled={
              !commentText.length ||
              isLoading ||
              !Boolean(commentText.trimStart())
            }
            className="rounded-md border border-sky-500 bg-sky-500 p-2 text-white hover:opacity-90 active:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:border-gray-500 dark:disabled:bg-gray-400"
          >
            Отправить
          </button>
          {(error as ServerError)?.data.map(({ message }, index) => (
            <p key={index} className="text-red-500">
              {message}
            </p>
          ))}
        </form>
      )}
      <div className="divide-y divide-slate-400 dark:divide-slate-300">
        {comment?.map(({ _id, author, emojis, text, createdAt }) => (
          <Comment
            key={_id}
            _id={_id}
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
