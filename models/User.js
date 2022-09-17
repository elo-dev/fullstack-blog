import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
