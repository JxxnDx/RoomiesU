import multer from 'multer';

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/avif', 'image/webp'];

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de imagen no permitido. Solo se aceptan jpg, jpeg, png, avif y webp.'));
    }
  }
});

export const uploadSingleImage = upload.single('image');
