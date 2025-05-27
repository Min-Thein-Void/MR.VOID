const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../Public"); // Directory where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Filename with a unique suffix
  }
});

const upload = multer({ storage: storage });

module.exports = upload