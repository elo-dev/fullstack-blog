import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'
import { Navigate } from 'react-router'
import MDEditor from 'react-simplemde-editor'

import Back from '../../components/Back/Back'

import { instance } from '../../instance'
import { useAppSelector } from '../../hooks'
import { selectIsAuth } from '../../services/slices/auth'

import 'easymde/dist/easymde.min.css'

const MarkdownEditor = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputFileRef = useRef(null)

  const onChange = useCallback((value: string) => {
    setText(value)
  }, [])

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await instance.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
    }
  }

  const onClickRemoveImage = () => setImageUrl('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text,
      }
      await instance.post('/posts', fields)
      setImageUrl('')
      setIsLoading(false)
      setTags('')
      setText('')
      setTitle('')
    } catch (error) {
      console.log(error)
    }
  }

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
        <div className="flex gap-x-5">
          <button
            type={'button'}
            onClick={() => inputFileRef.current.click()}
            className="rounded-sm border border-sky-500 px-5 py-2 font-medium text-sky-500 hover:border-sky-700 hover:text-sky-700 active:opacity-70"
          >
            Загрузить превью
          </button>
          {imageUrl && (
            <button
              type={'button'}
              className="rounded-sm border border-red-500 px-5 py-2 font-medium text-red-500"
              onClick={onClickRemoveImage}
            >
              Удалить
            </button>
          )}
        </div>
        {imageUrl && (
          <img
            src={`http://localhost:8888${imageUrl}`}
            alt="preview"
            className="my-10 w-40 object-contain"
          />
        )}
        <input
          type={'file'}
          ref={inputFileRef}
          onChange={handleChangeFile}
          accept="image/*"
          hidden
        />
        <div className="my-3 flex flex-col gap-y-2">
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
            placeholder="Теги"
            className="border-b border-slate-500 bg-transparent pb-1 placeholder-sky-500 placeholder:font-medium focus:outline-none"
          />
        </div>
        <MDEditor value={text} onChange={onChange} options={options} />
        <button
          type={'submit'}
          className="rounded-sm bg-sky-500 px-5 py-2 text-white hover:opacity-80 active:bg-sky-700"
        >
          Опубликовать
        </button>
      </form>
    </>
  )
}
export default MarkdownEditor
