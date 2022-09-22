import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import { checkAuth, handleValidationError } from './utils/index.js'
import { loginValidation, registerValiddation } from './validations/auth.js'
import { createValidation } from './validations/post.js'
import { commentValidation } from './validations/comment.js'
import {
  UserController,
  PostController,
  CommentController,
} from './controllers/index.js'
import { cloudinaryMiddleware } from './controllers/cloudinaryMiddleware.js'
import upload from './utils/multer.js'

dotenv.config()

const PORT = process.env.PORT || 8888

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connect DB is ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post(
  '/auth/login',
  loginValidation,
  handleValidationError,
  UserController.login
)
app.post(
  '/auth/register',
  registerValiddation,
  handleValidationError,
  UserController.register
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post(
  '/posts',
  checkAuth,
  upload.single('imageUrl'),
  createValidation,
  handleValidationError,
  cloudinaryMiddleware,
  PostController.create
)

app.patch(
  '/posts/:id',
  checkAuth,
  upload.single('imageUrl'),
  createValidation,
  handleValidationError,
  cloudinaryMiddleware,
  PostController.update
)
app.delete('/posts/:id', checkAuth, PostController.deleteOne)

app.post(
  '/posts/:id/comment',
  checkAuth,
  commentValidation,
  handleValidationError,
  CommentController.create
)

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Connect to PORT:', PORT)
})
