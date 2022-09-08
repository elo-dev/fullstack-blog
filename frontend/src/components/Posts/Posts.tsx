const Posts = () => {
  return (
    <div>
      <h1 className="text-8xl font-semibold md:text-7xl">The Blog</h1>
      <div className="my-12 grid grid-cols-3 gap-y-16 gap-x-10 sm:grid-cols-1 md:grid-cols-2">
        {[0, 1, 2, 3].map((item, index) => (
          <div
            key={index}
            className="group flex cursor-pointer flex-col gap-10 first:col-span-full first:flex-row hover:text-sky-500 sm:col-span-1 sm:flex-col sm:gap-5 md:col-span-2 md:flex-col md:first:flex-col"
          >
            <img
              src="https://images.unsplash.com/photo-1662548293729-0da75f4178d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="img"
              className="w-full rounded-xl group-first:w-[50%] md:group-first:w-full"
            />
            <div className="flex flex-col justify-around gap-5 group-first:gap-0 md:group-first:gap-5">
              <p className="text-slate-500">September 07 2022</p>
              <p className="line-clamp-3 text-5xl font-semibold md:text-3xl">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius,
                beatae.
              </p>
              <p className="line-clamp-3 font-medium text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis nobis iure recusandae, odit repudiandae dolorum?
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Posts
