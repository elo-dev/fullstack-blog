import { validationResult } from 'express-validator'

export default (req, res, next) => {
  const errorFormatter = ({ msg }) => {
    return { message: msg }
  }

  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  next()
}
