import mongoose from 'mongoose'

const CommentScheme = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    text: { type: String, required: true },
    emoji: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('Comment', CommentScheme)
