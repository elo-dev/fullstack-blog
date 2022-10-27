import multer from 'multer'
import path from 'path'

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase()
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.svg') {
      cb(new Error('Не верный формат файла'), false)
      return
    }
    cb(null, true)
  },
})

export default upload
