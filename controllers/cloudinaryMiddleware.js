import { cloudinary } from '../utils/cloudinary.js'

const cloudinaryMiddleware = async (req, res, next) => {
  if (!Boolean(req.file)) {
    return next()
  }
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    req.body.imageUrl = result.secure_url
    next()
  } catch (error) {
    res.status(500).json([{ message: 'Ошибка при обработке' }])
  }
}

export { cloudinaryMiddleware }
