import loader from '@assets/loader.gif'

const Loader = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center md:h-[calc(100vh-150px)]">
      <img src={loader} alt="loader" />
    </div>
  )
}
export default Loader
