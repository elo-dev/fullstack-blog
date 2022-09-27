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
    res.status(500).json([{ message: 'Не удалось добавить комментарий' }])
  }
}

export const addEmoji = async (req, res) => {
  try {
    const commentId = req.body.id
    const currentUser = req.userId

    const comment = await CommentModel.findById(commentId)

    const isEmpty = comment.emojis?.find((item) => item.user === currentUser)

    if (!Boolean(isEmpty)) {
      CommentModel.findByIdAndUpdate(
        commentId,
        {
          $push: { emojis: { user: currentUser, emoji: req.body.emoji } },
        },
        {
          returnDocument: 'after',
        },
        (err, doc) => {
          if (err) {
            return res
              .status(500)
              .json([{ message: 'Не удалось добавить эмодзи' }])
          }

          if (!doc) {
            return res
              .status(404)
              .json([{ message: 'Не удалось добавить эмодзи' }])
          }

          res.status(200).json(doc.emojis)
        }
      )
    } else {
      const result = await CommentModel.findByIdAndUpdate(
        commentId,
        {},
        {
          returnDocument: 'after',
        }
      )

      const emojiEqual = result.emojis.find(
        (item) => item.user === currentUser && item.emoji === req.body.emoji
      )
      const emojiNotEqual = result.emojis.find(
        (item) => item.user === currentUser && item.emoji !== req.body.emoji
      )

      if (emojiEqual) {
        CommentModel.findByIdAndUpdate(
          commentId,
          {
            $pull: { emojis: { user: currentUser } },
          },
          { returnDocument: 'after' },
          (err, doc) => {
            if (err) {
              return res
                .status(500)
                .json([{ message: 'Не удалось удалить эмодзи' }])
            }

            if (!doc) {
              return res
                .status(404)
                .json([{ message: 'Не удалось удалить эмодзи' }])
            }

            res.status(200).json(doc.emojis)
          }
        )
      }

      if (emojiNotEqual) {
        CommentModel.findByIdAndUpdate(
          commentId,
          {
            $pull: { emojis: { user: currentUser } },
          },
          { returnDocument: 'after' },
          (err, doc) => {
            if (err) {
              return res
                .status(500)
                .json([{ message: 'Не удалось обновить эмодзи' }])
            }

            if (!doc) {
              return res
                .status(404)
                .json([{ message: 'Не удалось обновить эмодзи' }])
            }

            CommentModel.findByIdAndUpdate(
              commentId,
              {
                $push: { emojis: { user: currentUser, emoji: req.body.emoji } },
              },
              { returnDocument: 'after' }
            )
              .then((result) => res.status(200).json(result.emojis))
              .catch((err) =>
                res
                  .status(500)
                  .json([{ message: 'Не удалось обновить эмодзи' }])
              )
          }
        )
      }
    }
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось добавить эмодзи' }])
  }
}
