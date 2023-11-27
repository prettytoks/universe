const express = require('express');
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/verifyToken');

const postRouter = express.Router();

postRouter.get('/find/userposts/:id', postController.getUserPosts);
postRouter.get('/timeline/posts', verifyToken, postController.getTimelinePosts);
postRouter.get('/find/:id', postController.getOnePost);
postRouter.post('/', verifyToken, postController.createPost);
postRouter.put('/:id', verifyToken, postController.updatePost);
postRouter.delete('/:id', verifyToken, postController.deletePost);
postRouter.put('/toggleLike/:id', verifyToken, postController.toggleLike);

module.exports = postRouter;
