const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/images');
  },
  filename: (req, file, cb) => {
    let extension = file.mimetype.slice(file.mimetype.lastIndexOf('/') + 1);
    cb(null, '/' + file.originalname + '.' + extension);
  }
})

module.exports = multer({storage: storage}).single('image');
