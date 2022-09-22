import { body } from 'express-validator'

export const commentValidation = [
  body('text', 'Комментарий должен быть от 5 до 300 символов')
    .isLength({ min: 5, max: 300 })
    .isString(),
]
