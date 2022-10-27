const Filters = ({ onFilterPopular, onFilterNew, onFilterFriends }) => {
  return (
    <div className="my-10">
      <ul className="flex space-x-4 uppercase md:justify-center">
        <li
          onClick={onFilterNew}
          className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline"
        >
          новые
        </li>
        <li
          onClick={onFilterPopular}
          className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline"
        >
          популярные
        </li>
        <li
          onClick={onFilterFriends}
          className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline"
        >
          Друзья
        </li>
      </ul>
    </div>
  )
}
export default Filters
