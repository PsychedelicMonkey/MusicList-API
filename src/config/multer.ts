import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public',
  filename(req, file, cb) {
    cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100000000 },
  fileFilter(req, file, cb) {
    const fileTypes = /jpg|jpeg|png/;

    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }

    return cb(new Error('only images are allowed'));
  },
}).single('upload');

export default upload;
