export const timeTransform = (createdAt: Date) => {
  const createdDate = new Date(createdAt).toLocaleDateString()
  const currentDate = new Date().toLocaleDateString()
  const createdTime = new Date(createdAt)
  const createdHour = createdTime.getHours()
  const createdMin = createdTime.getMinutes()
  const todayTime = `${createdHour}:${
    createdMin < 10 ? `0${createdMin}` : createdMin
  }`

  const isCreatedToday = currentDate === createdDate

  return {
    isCreatedToday,
    todayTime,
    createdDate,
  }
}
