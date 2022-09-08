import { IoIosNotifications, IoIosArrowDown, IoIosSearch } from 'react-icons/io'

const Header = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="bg-slate-200 flex items-center px-2 rounded-full w-[50%] border border-sky-500 focus-within:border-sky-600">
        <IoIosSearch size="25" />
        <input
          type="text"
          className="p-1.5 w-full bg-transparent focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center space-x-2">
        <img
          className="rounded-[50%] w-[40px] h-[40px] object-cover cursor-pointer"
          src="https://images.unsplash.com/photo-1662401208927-0b71a8635a84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
        <p className="cursor-pointer">Name</p>
        <IoIosArrowDown className="cursor-pointer" />
        <IoIosNotifications size="25" className="cursor-pointer" />
      </div>
    </div>
  )
}
export default Header
