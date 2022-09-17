import { useNavigate } from 'react-router'
import { NotFoundProps } from './type'

const NotFound = ({ error }: NotFoundProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-9xl font-extrabold text-sky-500 drop-shadow-md">
        {error.status}
      </h1>
      {error.data.map(({ message }, index) => (
        <p key={index}>{message}</p>
      ))}
      <button
        onClick={() => navigate('/')}
        className="rounded-md border border-sky-500 px-5 py-2 hover:bg-sky-500 hover:text-white active:border-sky-700 active:bg-sky-700"
      >
        Главная
      </button>
    </div>
  )
}
export default NotFound
