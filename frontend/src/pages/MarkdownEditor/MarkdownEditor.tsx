import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router'
import MDEditor from 'react-simplemde-editor'
import { VscLoading } from 'react-icons/vsc'

import Back from '@components/Back/Back'
import Loader from '@components/Loader/Loader'

import { instance } from '../../instance'

import { useAppSelector } from '@hooks/index'

import { selectIsAuth } from '@services/slices/userSlice'
import {
  useAddNewPostMutation,
  usePatchPostMutation,
} from '@services/query/posts'

import { PostItem } from '@myTypes/Post'
import { Me } from '@myTypes/User'

import 'easymde/dist/easymde.min.css'

const MarkdownEditor = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const { pathname } = useLocation()

  const [addNewPost, { isLoading: isAddNewPostLoading }] =
    useAddNewPostMutation()
  const [patchPost, { isLoading: isPatchPostLoading }] = usePatchPostMutation()
  const isAuth = useAppSelector(selectIsAuth)

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string | undefined>('')
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const inputFileRef = useRef<HTMLButtonElement & HTMLInputElement>(null)

  const isEditing = Boolean(id)

  useEffect(() => {
    setIsLoading(true)
    if (!pathname.includes('edit')) {
      setIsLoading(false)
    }
    if (pathname.includes('edit') && isAuth && localStorage.getItem('token')) {
      instance.get<PostItem>(`/posts/${id}`).then((res) => {
        instance.get<Me>('/auth/me').then((user) => {
          if (res.data.author._id !== user?.data._id) {
            navigation('/')
          } else if (isEditing) {
            setIsLoading(false)
            setTitle(res.data.title)
            setText(res.data.text)
            setImageUrl(res.data.imageUrl)
            setTags(res.data.tags?.tag?.join(' '))
          }
        })
      })
    }
  }, [isAuth])

  const onChange = useCallback((value: string) => {
    setText(value)
  }, [])

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: any = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setImageUrl(file)
    }
  }

  const onClickRemoveImage = () => {
    setPreview('')
    setImageUrl('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', title.trim())
      formData.append('text', text.trim())
      if (tags) {
        formData.append('tags', tags)
      }
      formData.append('imageUrl', imageUrl)

      isEditing
        ? await patchPost({ id, formData }).unwrap()
        : await addNewPost({ formData }).unwrap()

      setIsSuccess(true)
      setPreview('')
      setImageUrl('')
      setTags('')
      setText('')
      setTitle('')
      setSubmitError([])
    } catch (error: any) {
      setSubmitError(error.data)
    }
  }

  useEffect(() => {
    const unsub = setTimeout(() => {
      setIsSuccess(false)
    }, 3000)

    return () => clearTimeout(unsub)
  }, [isSuccess])

  const options: any = useMemo(
    () => ({
      spellChecker: false,
      autofocus: true,
      placeholder: 'Введите текст...',
    }),
    []
  )

  if (!localStorage.getItem('token') && !isAuth) return <Navigate to="/auth" />
  if (isLoading) return <Loader />

  return (
    <>
      <Back />
      <form className="py-5" onSubmit={handleSubmit}>
        <div className="flex space-x-5">
          <button
            type={'button'}
            onClick={() => inputFileRef.current?.click()}
            className="rounded-sm border border-sky-500 px-5 py-2 font-medium text-sky-500 hover:border-sky-700 hover:text-sky-700 active:opacity-70"
          >
            Загрузить превью
          </button>
          {(preview || imageUrl) && (
            <button
              type={'button'}
              className="rounded-sm border border-red-500 px-5 py-2 font-medium text-red-500"
              onClick={onClickRemoveImage}
            >
              Удалить
            </button>
          )}
        </div>
        {preview || imageUrl ? (
          <img
            src={preview ? preview : imageUrl}
            alt="preview"
            className="my-10 w-40 object-contain"
          />
        ) : null}
        <input
          type={'file'}
          ref={inputFileRef}
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/jpg, .svg"
          hidden
        />
        <div className="my-3 flex flex-col space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Заголовок статьи..."
            className="bg-transparent py-3 text-3xl font-bold placeholder-sky-500 placeholder:font-bold focus:outline-none dark:text-neutral-300"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Теги через пробел"
            className="border-b border-slate-500 bg-transparent pb-1 placeholder-sky-500 placeholder:font-medium focus:outline-none dark:text-neutral-300"
          />
        </div>
        <MDEditor
          className="rounded-md dark:bg-slate-200"
          value={text}
          onChange={onChange}
          options={options}
        />
        <button
          disabled={isAddNewPostLoading || isPatchPostLoading}
          type={'submit'}
          className="rounded-sm bg-sky-500 px-5 py-2 text-white hover:opacity-80 active:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-80 dark:mt-4"
        >
          <div className="flex items-center space-x-2">
            <p>{isEditing ? 'Сохранить' : 'Опубликовать'}</p>
            {(isAddNewPostLoading || isPatchPostLoading) && (
              <VscLoading className="animate-spin" />
            )}
          </div>
        </button>
        <div className="mt-3">
          {submitError?.map(({ message }, index) => (
            <p key={index} className="text-red-500">
              {message}
            </p>
          ))}
          {isSuccess && (
            <p className="font-medium text-green-500">
              {isEditing ? 'Статья обновлена' : 'Статья опубликована'}
            </p>
          )}
        </div>
      </form>
    </>
  )
}
export default MarkdownEditor
