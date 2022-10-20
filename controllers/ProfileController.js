import UserModel from '../models/User.js'

export const getProfile = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.params.id).populate({
      path: 'posts',
      populate: {
        path: 'author',
      },
      options: {
        sort: {
          createdAt: -1,
        },
      },
    })

    if (!userProfile)
      return res.status(404).json([{ message: 'Пользователь не найден' }])

    res.status(200).json(userProfile)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить профиль' }])
  }
}
