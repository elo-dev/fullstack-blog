const Filters = () => {
  return (
    <div className="my-10">
      <ul className="flex gap-3 uppercase">
        <li className="font-medium cursor-pointer hover:text-sky-500 hover:underline underline-offset-8">
          new
        </li>
        <li className="font-medium cursor-pointer hover:text-sky-500 hover:underline underline-offset-8">
          most popular
        </li>
        <li className="font-medium cursor-pointer hover:text-sky-500 hover:underline underline-offset-8">
          friend
        </li>
      </ul>
    </div>
  )
}
export default Filters
