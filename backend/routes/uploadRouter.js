const express = require('express');
const { uploadController, upload } = require('../controllers/uploadController');
const verifyToken = require('../middlewares/verifyToken');

const uploadRouter = express.Router();

uploadRouter.post('/image', verifyToken, upload.single('image'), uploadController.uploadImage);

module.exports = uploadRouter;
