import { useGetTagsQuery } from '@services/query/profile'

const RecommendsTags = () => {
  const { data: tags } = useGetTagsQuery()

  return (
    <div className="space-y-4 rounded-md bg-white p-5 shadow-md dark:bg-opacity-90">
      <p>Тренды для вас</p>
      {tags?.slice(0, 5).map((tag, index) => (
        <div key={index} className="grid grid-cols-2 space-x-2">
          <p className="truncate"># {tag[0]}</p>
          <span className="truncate text-right text-sm text-slate-500 dark:text-slate-600">
            {tag[1]} упоминаний
          </span>
        </div>
      ))}
    </div>
  )
}
export default RecommendsTags
