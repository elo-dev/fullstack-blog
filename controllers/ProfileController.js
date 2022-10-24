import UserModel from '../models/User.js'
import TagsModel from '../models/Tags.js'

export const getProfile = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.params.id)
      .populate({
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
      .populate({
        path: 'posts',
        populate: {
          path: 'tags',
        },
      })

    if (!userProfile)
      return res.status(404).json([{ message: 'Пользователь не найден' }])

    res.status(200).json(userProfile)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить профиль' }])
  }
}

export const getTags = async (req, res) => {
  try {
    const tags = await TagsModel.find()

    const tag = tags.map((item) => item.tag).flat(1)

    let repeat = {}

    for (let i = 0; i < tag.length; i++) {
      let word = tag[i].toLowerCase()

      repeat[word] = repeat[word] ? repeat[word] + 1 : 1
    }

    const filtred = Object.entries(repeat).sort((a, b) => b[1] - a[1])

    res.status(200).json(filtred)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить теги' }])
  }
}
