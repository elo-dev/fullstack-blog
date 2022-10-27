import PostModel from '../models/Post.js'
import TagsModel from '../models/Tags.js'
import UserModel from '../models/User.js'

export const create = async (req, res) => {
  try {
    const docPost = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    })

    if (req.body.tags) {
      const docTags = new TagsModel({
        tag: req.body.tags.match(/\S+/g),
      })

      docPost.tags = docTags
      await docTags.save()
    }

    const post = await docPost.save()

    const user = await UserModel.findById(req.userId)

    user.posts.push(post)

    await user.save()

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось создать статью' }])
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate('author comments tags')
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
      .populate('author comments tags')
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

    const docPost = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        author: req.userId,
      }
    )

    if (req.body.tags) {
      if (docPost.tags) {
        await TagsModel.updateOne(
          {
            _id: docPost.tags?._id,
          },
          {
            tag: req.body.tags.match(/\S+/g),
          }
        )
      } else {
        const docTags = new TagsModel({
          tag: req.body.tags.match(/\S+/g),
        })

        docPost.tags = docTags
        await docTags.save()
        await docPost.save()
      }
    } else {
      if (docPost.tags) {
        await TagsModel.deleteOne({
          _id: docPost.tags._id,
        })

        await PostModel.updateOne({ _id: postId }, { $unset: { tags: 1 } })
      } else {
        const docTags = new TagsModel({
          tag: req.body.tags.match(/\S+/g),
        })

        docPost.tags = docTags
        await docTags.save()
        await docPost.save()
      }
    }

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

export const searchPost = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm

    const searchedPost = await PostModel.find({
      title: { $regex: searchTerm, $options: 'i' },
    })
      .populate('author')
      .exec()

    res.status(200).json(searchedPost)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось найти пост' }])
  }
}

export const filterFriendsPost = async (req, res) => {
  try {
    const users = await UserModel.findById(req.userId).populate({
      path: 'following',
      populate: {
        path: 'posts',
        populate: {
          path: 'author',
        },
      },
    })

    const posts = users.following.flatMap((item) => item.posts)

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json([{ message: 'Не удалось отфильтровать посты' }])
  }
}
