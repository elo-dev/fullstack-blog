import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchRegister } from '../../../services/slices/auth'
import { Register } from '../../../types/Auth'

const RegistrationPage = () => {
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.auth)
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: Register) => {
    try {
      const data: any = await dispatch(fetchRegister(values))

      if ('token' in data.payload) {
        localStorage.setItem('token', data.payload.token)
      }
    } catch (error) {
      setErrorMsg('Не удалось зарегистрироваться')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[calc(100vh-108px)] flex-col items-center justify-center"
    >
      <div className="relative flex w-1/4 items-center bg-slate-100 pl-2 md:w-1/2 sm:md:w-full">
        <MdPerson
          className={`mx-1 ${
            Boolean(errors.fullname?.message) && 'text-red-500'
          }`}
        />
        <label
          htmlFor="fullname"
          className="absolute bottom-0 left-0 right-0 w-full border border-slate-300"
        />
        <input
          name="fullname"
          type={'text'}
          {...register('fullname', { required: 'Укажите Ваше имя' })}
          className="w-full border-sky-500 bg-transparent p-2 focus:border-r-4 focus:outline-none"
          placeholder="Полное имя"
        />
      </div>
      <div className="relative flex w-1/4 items-center bg-slate-100 pl-2 md:w-1/2 sm:md:w-full">
        <MdEmail
          className={`mx-1 ${Boolean(errors.email?.message) && 'text-red-500'}`}
        />
        <label
          htmlFor="email"
          className="absolute bottom-0 left-0 right-0 w-full border border-slate-300"
        />
        <input
          name="email"
          type={'email'}
          {...register('email', { required: 'Укажите почту' })}
          className="w-full border-sky-500 bg-transparent p-2 focus:border-r-4 focus:outline-none"
          placeholder="Почта"
        />
      </div>
      <div className="flex w-1/4 items-center bg-slate-100 pl-2 md:w-1/2 sm:md:w-full">
        <MdLock
          className={`mx-1 ${
            Boolean(errors.password?.message) && 'text-red-500'
          }`}
        />
        <input
          type={'password'}
          {...register('password', { required: 'Укажите пароль' })}
          className="w-full border-sky-500 bg-transparent p-2 focus:border-r-4 focus:outline-none"
          placeholder="Пароль"
        />
      </div>
      <button
        disabled={loading}
        type={'submit'}
        className="w-1/4 cursor-pointer bg-sky-500 py-2 text-white hover:opacity-80 active:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:opacity-80 md:w-1/2 sm:md:w-full"
      >
        Зарегистрироваться
      </button>
      <div className="mt-3">
        {error?.map(({ message }, index) => (
          <p key={index} className="text-red-500">
            {message}
          </p>
        ))}
        <p className="text-red-500">{errorMsg}</p>
        <p className="text-red-500">{errors.fullname?.message}</p>
        <p className="text-red-500">{errors.email?.message}</p>
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
    </form>
  )
}
export default RegistrationPage
