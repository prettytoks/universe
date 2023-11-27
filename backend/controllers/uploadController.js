const multer = require("multer");
const verifyToken = require('../middlewares/verifyToken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  }
});

const upload = multer({
  storage: storage
});

const uploadController = {};

uploadController.uploadImage = async (req, res) => {
  try {
    return res.status(200).json({ msg: "Image successfully uploaded" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error uploading image" });
  }
};

module.exports = { uploadController, upload };
