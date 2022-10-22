import UserModel from '../models/User.js'

export const getAll = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    user.notifications.push(...user.newNotifications)

    user.newNotifications = []

    await user.save()

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить уведомления' }])
  }
}
