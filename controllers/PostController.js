import PostModel from '../models/Post.js'

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags?.match(/\S+/g),
      imageUrl: req.body.imageUrl,
      author: req.userId,
    })

    const post = await doc.save()

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось создать статью' }])
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate('author comments')
      .sort({ createdAt: -1 })
      .exec()

    res.json(posts)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить статьи' }])
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res
            .status(500)
            .json([{ message: 'Не удалось получить статью' }])
        }

        if (!doc) {
          return res.status(404).json([{ message: 'Статья не найдена' }])
        }

        res.status(200).json(doc)
      }
    )
      .populate('author comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
        },
      })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось получить статью' }])
  }
}

export const deleteOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },

      (err, doc) => {
        if (err) {
          console.log(err)
          res.status(500).json([{ message: 'Не удалось удалить статью' }])
        }

        if (!doc) {
          return res.status(404).json([{ message: 'Статья не найдена' }])
        }

        res.status(200).json({ success: true })
      }
    )
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось удалить статью' }])
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags.match(/\S+/g),
        imageUrl: req.body.imageUrl,
        author: req.userId,
      }
    )

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось обновить статью' }])
  }
}

export const filterNewPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate('author comments')
      .sort({ createdAt: -1 })
      .exec()

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось отфильтровать посты' }])
  }
}

export const filterPopularPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate('author comments')
      .sort({ viewsCount: -1 })
      .exec()

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось отфильтровать посты' }])
  }
}
