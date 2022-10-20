const RecommendsTags = () => {
  return (
    <div className="space-y-4 rounded-md bg-white p-5 shadow-md">
      <p>Тренды для вас</p>
      <div className="flex items-center justify-between space-x-2">
        <p className="truncate"># название</p>
        <span className="truncate text-sm text-gray-500">97k упоминаний</span>
      </div>
    </div>
  )
}
export default RecommendsTags
