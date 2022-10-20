import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/User.js'

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      fullname: req.body.fullname,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey',
      {
        expiresIn: '30d',
      }
    )

    const { passwordHash, ...userData } = user._doc

    return res.status(200).json({ ...userData, token })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось зарегистрироваться' }])
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
      .populate('passwordHash')
      .exec()

    if (!user)
      return res.status(404).json([{ message: 'Пользователь не найден' }])

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    )

    if (!isValidPass)
      return res.status(400).json([{ message: 'Неверный логин или пароль' }])

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey',
      {
        expiresIn: '30d',
      }
    )

    const { passwordHash, ...userData } = user._doc

    return res.json({ ...userData, token })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось авторизоваться' }])
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user)
      return res.status(404).json([{ message: 'Пользователь не найден' }])

    const { passwordHash, ...userData } = user._doc

    return res.json(userData)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить пользователя' }])
  }
}

export const updateMe = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fullname: req.body.fullname,
        email: req.body.email,
        avatarUrl: req.body.imageUrl,
      },
      { returnDocument: 'after' }
    ).exec()

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось обновить профиль' }])
  }
}

export const follow = async (req, res) => {
  try {
    if (req.userId === req.body.followId)
      return res.status(405).json([{ message: 'Действие не доступно' }])

    await UserModel.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.userId },
      },
      { returnDocument: 'after' }
    )
    await UserModel.findByIdAndUpdate(
      req.userId,
      {
        $push: { following: req.body.followId },
      },
      { returnDocument: 'after' }
    )

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось подписаться' }])
  }
}

export const unfollow = async (req, res) => {
  try {
    if (req.userId === req.body.unfollowId)
      return res.status(405).json([{ message: 'Действие не доступно' }])

    await UserModel.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.userId },
      },
      { returnDocument: 'after' }
    )
    await UserModel.findByIdAndUpdate(
      req.userId,
      {
        $pull: { following: req.body.unfollowId },
      },
      { returnDocument: 'after' }
    )

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось подписаться' }])
  }
}
