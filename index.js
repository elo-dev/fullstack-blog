import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

import { checkAuth, handleValidationError } from './utils'

import { loginValidation, registerValiddation } from './validations/auth.js'
import { createValidation } from './validations/post.js'

import { UserController, PostController } from './controllers'

const PORT = 8888

mongoose
  .connect(
    'mongodb+srv://admin:D20frolov@cluster0.wd5cyty.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connect DB is ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

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
  createValidation,
  handleValidationError,
  PostController.create
)
app.patch(
  '/posts/:id',
  checkAuth,
  createValidation,
  handleValidationError,
  PostController.update
)
app.delete('/posts/:id', checkAuth, PostController.deleteOne)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.status(200).json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Connect to PORT:', PORT)
})