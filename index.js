import express from 'express'
import mongoose from 'mongoose'

import checkAuth from './utils/checkAuth.js'

import { loginValidation, registerValiddation } from './validations/auth.js'
import { createValidation } from './validations/post.js'

import { getMe, login, register } from './controllers/UserController.js'
import {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
} from './controllers/PostController.js'

const PORT = 8888

mongoose
  .connect(
    'mongodb+srv://admin:D20frolov@cluster0.wd5cyty.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connect DB is ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, login)
app.post('/auth/register', registerValiddation, register)
app.get('/auth/me', checkAuth, getMe)

app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, createValidation, create)
app.patch('/posts/:id', checkAuth, update)
app.delete('/posts/:id', checkAuth, deleteOne)

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Connect to PORT:', PORT)
})
