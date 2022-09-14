import { useNavigate } from 'react-router'
import { IoIosArrowBack } from 'react-icons/io'

const Back = () => {
  const navigate = useNavigate()

  return (
    <div
      className="inline-flex cursor-pointer items-center hover:text-cyan-500"
      onClick={() => navigate('/')}
    >
      <IoIosArrowBack className="text-2xl" /> Назад
    </div>
  )
}
export default Back
