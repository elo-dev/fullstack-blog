import { useNavigate } from 'react-router'
import { IoIosArrowBack } from 'react-icons/io'

const Back = () => {
  const navigate = useNavigate()

  return (
    <div
      className="inline-flex cursor-pointer items-center hover:text-cyan-500"
      onClick={() => navigate(-1)}
    >
      <IoIosArrowBack className="text-2xl" /> Back
    </div>
  )
}
export default Back
