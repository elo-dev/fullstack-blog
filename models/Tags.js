import mongoose from 'mongoose'

const TagsScheme = new mongoose.Schema({
  tag: { type: Array, default: [] },
})

export default mongoose.model('Tags', TagsScheme)
