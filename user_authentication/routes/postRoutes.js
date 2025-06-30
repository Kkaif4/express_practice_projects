import express from 'express';
import {
  createPost,
  deletePost,
  getPostsOfUserByPostId,
  getUsersPost,
  publishPost,
  updatePost,
} from '../controller/postController.js';
import { isUserValid, validateToken } from '../middleware/protect.js';

const router = express.Router();

router.get('/', isUserValid, getUsersPost);

router.get('/:postId', validateToken, isUserValid, getPostsOfUserByPostId);

router.post('/create-post/', validateToken, isUserValid, createPost);
router.patch('/publish-post/:postId', validateToken, isUserValid, publishPost);

router.put('/update/:postId', validateToken, isUserValid, updatePost);

router.delete(
  '/delete/:username/:postId',
  validateToken,
  isUserValid,
  deletePost
);

export default router;
