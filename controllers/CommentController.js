import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'

export const create = async (req, res) => {
  try {
    const postId = req.params.id

    const doc = new CommentModel({
      text: req.body.text,
      author: req.userId,
      post: postId,
    })

    const comment = await doc.save()

    comment.populate('author')

    const postRelated = await PostModel.findById(postId)

    postRelated.comments.push(comment)

    await postRelated.save()

    res.status(200).json(comment)
  } catch (error) {
    console.log(error)
    res.status(500).json([{ message: 'Не удалось добавить комментарий' }])
  }
}
