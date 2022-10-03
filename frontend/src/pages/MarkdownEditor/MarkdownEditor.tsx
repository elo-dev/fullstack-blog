import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Navigate, useParams } from 'react-router'
import MDEditor from 'react-simplemde-editor'

import Back from '../../components/Back/Back'

import { instance } from '../../instance'
import { useAppSelector } from '../../hooks'
import { selectIsAuth } from '../../services/slices/auth'

import { PostItem } from '../../types/Post'

import 'easymde/dist/easymde.min.css'
import {
  useAddNewPostMutation,
  usePatchPostMutation,
} from '../../services/query/posts'

const MarkdownEditor = () => {
  const { id } = useParams()
  const [addNewPost] = useAddNewPostMutation()
  const [patchPost] = usePatchPostMutation()
  const isAuth = useAppSelector(selectIsAuth)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState<any>('')
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const inputFileRef = useRef(null)
  const isEditing = Boolean(id)

  const onChange = useCallback((value: string) => {
    setText(value)
  }, [])

  useEffect(() => {
    if (id) {
      instance.get<PostItem>(`/posts/${id}`).then((res) => {
        setTitle(res.data.title)
        setText(res.data.text)
        setImageUrl(res.data.imageUrl)
        setTags(res.data.tags.join(' '))
      })
    }
  }, [])

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setImageUrl(file)
  }

  const onClickRemoveImage = () => {
    setPreview(null)
    setImageUrl('')
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('text', text)
      formData.append('tags', tags)
      formData.append('imageUrl', imageUrl)

      isEditing
        ? await patchPost({ id, formData }).unwrap()
        : await addNewPost({ formData }).unwrap()

      setIsSuccess(true)
      setPreview(null)
      setImageUrl('')
      setIsLoading(false)
      setTags('')
      setText('')
      setTitle('')
      setSubmitError([])
    } catch (error) {
      setSubmitError(error.response.data)
      setIsLoading(false)
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
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  if (!localStorage.getItem('token') && !isAuth) return <Navigate to="/auth" />

  return (
    <>
      <Back />
      <form className="py-5" onSubmit={handleSubmit}>
        <div className="flex space-x-5">
          <button
            type={'button'}
            onClick={() => inputFileRef.current.click()}
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
          accept="image/*"
          hidden
        />
        <div className="my-3 flex flex-col space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Заголовок статьи..."
            className="bg-transparent py-3 text-3xl font-bold placeholder-sky-500 placeholder:font-bold focus:outline-none"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Теги через пробел"
            className="border-b border-slate-500 bg-transparent pb-1 placeholder-sky-500 placeholder:font-medium focus:outline-none"
          />
        </div>
        <MDEditor value={text} onChange={onChange} options={options} />
        <button
          disabled={isLoading}
          type={'submit'}
          className="rounded-sm bg-sky-500 px-5 py-2 text-white hover:opacity-80 active:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-80"
        >
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </button>
        <div className="mt-3">
          {submitError.map(({ message }, index) => (
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
