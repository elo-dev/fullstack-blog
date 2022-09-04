import { body } from 'express-validator'

export const createValidation = [
  body('title', 'Заголовок должен быть минимум 5 символов')
    .isLength({ min: 5 })
    .isString(),
  body('text', 'Статья должна содержать минимум 10 символов')
    .isLength({ min: 10 })
    .isString(),
  body('tags', 'Неверный формат тегов').optional().isArray(),
  body('imageUrl', 'Неверная ссылка изображение').optional().isString(),
]
