const express = require('express');
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/verifyToken');

const commentRouter = express.Router();

commentRouter.get('/:postId', commentController.getAllComments);
commentRouter.get('/find/:commentId', commentController.getComment);
commentRouter.post('/', verifyToken, commentController.createComment);
commentRouter.put('/:commentId', verifyToken, commentController.updateComment);
commentRouter.delete('/:commentId', verifyToken, commentController.deleteComment);
commentRouter.put('/toggleLike/:commentId', verifyToken, commentController.toggleLikeComment);

module.exports = commentRouter;
