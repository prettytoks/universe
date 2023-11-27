const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const userRouter = express.Router();

userRouter.get('/find/suggestedUsers', verifyToken, userController.getSuggestedUsers);
userRouter.get('/find/friends', verifyToken, userController.getFriends);
userRouter.get('/find/:userId', verifyToken, userController.getOneUser);
userRouter.get('/findAll', userController.getAllUsers);
userRouter.put('/updateUser/:userId', verifyToken, userController.updateUser);
userRouter.delete('/deleteUser/:userId', verifyToken, userController.deleteUser);
userRouter.put('/toggleFollow/:otherUserId', verifyToken, userController.toggleFollow);
userRouter.put('/bookmark/:postId', verifyToken, userController.bookmarkPost);

module.exports = userRouter;
