import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import { checkAuth, handleValidationError } from './utils/index.js'
import {
  loginValidation,
  registerValiddation,
  updateValidation,
} from './validations/auth.js'
import { createValidation } from './validations/post.js'
import { commentValidation } from './validations/comment.js'
import {
  UserController,
  PostController,
  CommentController,
  NotificationController,
  ProfileController,
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
app.patch(
  '/auth/update/:id',
  checkAuth,
  upload.single('avatarUrl'),
  updateValidation,
  handleValidationError,
  cloudinaryMiddleware,
  UserController.updateMe
)

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

app.get('/search/:searchTerm', PostController.searchPost)
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

app.get('/filter/new', PostController.filterNewPost)
app.get('/filter/popular', PostController.filterPopularPost)
app.get('/filter/friends', checkAuth, PostController.filterFriendsPost)

app.patch('/comment/emoji', checkAuth, CommentController.addEmoji)

app.get('/notifications', checkAuth, NotificationController.getAll)

app.get('/profile/:id', ProfileController.getProfile)
app.get('/tags', checkAuth, ProfileController.getTags)

app.patch('/follow', checkAuth, UserController.follow)
app.patch('/unfollow', checkAuth, UserController.unfollow)

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Connect to PORT:', PORT)
})
