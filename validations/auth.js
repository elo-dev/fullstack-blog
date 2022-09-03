import { body } from 'express-validator'

export const registerValiddation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длина пароля должна быть минимум 7 симоволов').isLength({
    min: 7,
  }),
  body('fullname', 'Длина имени должна быть минимум 3 символов').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Некорректная ссылка на аватарку').optional().isURL(),
]

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длина пароля должна быть минимум 7 симоволов').isLength({
    min: 7,
  }),
]
