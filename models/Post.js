import mongoose from 'mongoose'

const PostScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: { type: mongoose.Schema.Types.ObjectId, ref: 'Tags' },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Post', PostScheme)
