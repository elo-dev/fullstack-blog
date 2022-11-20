import { FiltersProps } from '@components/Filters/types'

const Filters = ({
  onFilterPopular,
  onFilterNew,
  onFilterFriends,
}: FiltersProps) => {
  return (
    <div className="my-10">
      <ul className="flex space-x-4 uppercase md:justify-center">
        <li
          onClick={onFilterNew}
          className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline dark:text-neutral-300 dark:hover:text-sky-500"
        >
          новые
        </li>
        <li
          onClick={onFilterPopular}
          className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline dark:text-neutral-300 dark:hover:text-sky-500"
        >
          популярные
        </li>
        <li
          onClick={onFilterFriends}
          className="cursor-pointer font-medium underline-offset-8 hover:text-sky-500 hover:underline dark:text-neutral-300 dark:hover:text-sky-500"
        >
          Друзья
        </li>
      </ul>
    </div>
  )
}
export default Filters
