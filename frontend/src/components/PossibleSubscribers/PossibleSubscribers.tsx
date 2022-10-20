const PossibleSubscribers = () => {
  return (
    <div className="space-y-5 overflow-auto rounded-md bg-white p-5 shadow-md lg:basis-full">
      <p>Возможные подписки</p>
      <div className="flex items-center justify-between space-x-2">
        <img
          src="https://images.unsplash.com/photo-1665760721698-8fffd43df3db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
          alt="avatar2"
          className="h-[52px] w-[52px] rounded-full object-cover xl:h-[42px] xl:w-[42px]"
        />
        <p className="w-1/4 truncate text-lg">aliasfasfasfas</p>
        <button className="rounded-xl bg-sky-500 px-3 py-1 text-sm text-white hover:opacity-80 md:text-base">
          Подписаться
        </button>
      </div>
    </div>
  )
}
export default PossibleSubscribers
