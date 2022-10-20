import { ChangeEvent, useState } from 'react'
import { Navigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { IoMdCamera } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { VscLoading } from 'react-icons/vsc'

import Back from '../../components/Back/Back'

import { useUpdateMeMutation } from '../../services/query/user'
import { useAppSelector } from '../../hooks'
import { currentUser } from '../../services/slices/userSlice'

const Settings = () => {
  const { user } = useAppSelector(currentUser)
  const [updateMe, { isLoading, error }] = useUpdateMeMutation()

  const [preview, setPreview] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
    },
    mode: 'onChange',
  })

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setImageUrl(file)
  }

  const onSubmit = async (values) => {
    const { fullname, email } = values
    const userData: any = new FormData()

    userData.append('fullname', fullname || user?.fullname)
    userData.append('email', email || user?.email)
    if (imageUrl || user?.avatarUrl) {
      userData.append('avatarUrl', imageUrl || user?.avatarUrl)
    }

    if (!fullname && !email && !imageUrl) return

    await updateMe({ id: user?._id, userData }).unwrap()
    reset()
  }

  if (!localStorage.getItem('token') && !user) return <Navigate to="/auth" />

  return (
    <>
      <div className="flex items-center space-x-4 md:justify-between">
        <Back />
        <h1 className="text-5xl font-semibold md:text-4xl">Settings</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[calc(100vh-160px)] items-center justify-center md:h-[calc(100vh-180px)]"
      >
        <div className="space-y-5 text-center">
          <div className="relative mx-auto flex justify-center">
            {preview || user?.avatarUrl ? (
              <img
                src={preview ? preview : user?.avatarUrl}
                alt="avatar"
                className="h-32 w-32 rounded-full border-2 border-sky-500 object-cover md:h-44 md:w-44"
              />
            ) : (
              <CgProfile className="h-32 w-32 rounded-full text-black" />
            )}
            <input
              type={'file'}
              id={'file'}
              onChange={handleChangeFile}
              className="hidden"
              accept="image/*"
              name="avatar"
            />
            <label
              htmlFor={'file'}
              className="absolute bottom-1 right-8 h-6 w-6 md:right-12"
            >
              <IoMdCamera
                size={25}
                className="cursor-pointer text-sky-500 hover:opacity-90"
              />
            </label>
          </div>
          <input
            name="fullname"
            {...register('fullname')}
            type={'text'}
            placeholder="Имя"
            className="mx-auto block rounded-md border border-sky-500 px-3 py-1 outline-none md:w-[250px]"
          />
          <input
            name="email"
            {...register('email')}
            type={'email'}
            placeholder="Почта"
            className="mx-auto block rounded-md border border-sky-500 px-3 py-1 outline-none md:w-[250px]"
          />
          <button
            type={'submit'}
            className="rounded-sm bg-sky-500 px-3 py-1 text-white hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500 md:px-4 md:py-1 md:text-lg"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <p>Сохранить</p>
              {isLoading && <VscLoading className="animate-spin" />}
            </div>
          </button>
          {(error as any)?.map(({ message }, index) => (
            <p key={index} className="text-red-500">
              {message}
            </p>
          ))}
        </div>
      </form>
    </>
  )
}

export default Settings
