import mongoose from 'mongoose'
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
      .populate('following')
      .populate('followers')

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

export const getSuggestedFriends = async (req, res) => {
  try {
    const me = await UserModel.findById(req.userId).populate({
      path: 'following',
      populate: {
        path: 'following',
      },
    })

    if (me.following.length) {
      const userFollowing = me.following
        .flatMap((item) => item.following)
        .filter((item) => item.id !== req.userId)

      const allUsers = await UserModel.aggregate([
        { $match: { _id: { $ne: mongoose.Types.ObjectId(req.userId) } } },
        { $sample: { size: 6 } },
      ])

      const arr = [...userFollowing, ...allUsers]

      const filteredArr = arr.reduce((acc, current) => {
        const x = acc.find((item) => {
          return item._id.toString() === current._id.toString()
        })
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])

      const duplicateFollowing = filteredArr.filter((item) =>
        me.following.some((el) => el.id === item._id.toString())
      )

      const withoutDuplicatesFollowing = [...new Set(filteredArr)]
        .filter((val) => !duplicateFollowing.includes(val))
        .slice(0, 5)

      res.status(200).json(withoutDuplicatesFollowing)
    } else {
      const allUsers = await UserModel.aggregate([
        { $match: { _id: { $ne: mongoose.Types.ObjectId(req.userId) } } },
        { $sample: { size: 5 } },
      ])

      res.status(200).json(allUsers)
    }
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить рекомендации' }])
  }
}
