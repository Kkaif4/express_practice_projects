import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/');
  },
  filename: function (req, file, cb) {
    try {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    } catch (err) {
      return cb(new Error('failed to generate filename'));
    }
  },
});

const filter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.text(ext) && allowedTypes.text(mime)) {
    cb(null, true);
  } else {
    return cb(new Error('Invalid file, please try again with valid file'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: filter,
});

export default upload;
