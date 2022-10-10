import UserModel from '../models/User.js'

export const getAll = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    let blank = []

    user.notifications = blank
    user.save()

    res.status(200).json({ status: 'success' })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить уведомления' }])
  }
}
