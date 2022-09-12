const Filters = () => {
  return (
    <div className="my-10">
      <ul className="flex gap-3 uppercase">
        <li className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline">
          новые
        </li>
        <li className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline">
          популярные
        </li>
        <li className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline">
          Друзья
        </li>
      </ul>
    </div>
  )
}
export default Filters
