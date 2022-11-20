import { useNavigate } from 'react-router'

import { ErrorProps } from '@pages/NotFound/types'

const NotFound = ({ error }: ErrorProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex h-[calc(100vh-85px)] flex-col items-center justify-center space-y-5 md:h-[calc(100vh-140px)]">
      <h1 className="text-9xl font-extrabold text-sky-500 drop-shadow-md">
        {error.status}
      </h1>
      {error.data.map(({ message }, index) => (
        <p key={index} className="dark:text-neutral-300">
          {message}
        </p>
      ))}
      <button
        onClick={() => navigate('/')}
        className="rounded-md border border-sky-500 px-5 py-2 hover:bg-sky-500 hover:text-white active:border-sky-700 active:bg-sky-700 dark:text-neutral-300"
      >
        Главная
      </button>
    </div>
  )
}
export default NotFound
