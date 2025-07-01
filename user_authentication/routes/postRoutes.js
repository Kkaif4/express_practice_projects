import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPostById,
  getUsersPost,
  publishPost,
  updatePost,
} from '../controller/postController.js';
import { isUserValid, validateToken } from '../middleware/protect.js';
import { checkPostId, emptyPost } from '../middleware/postDataHandler.js';

const router = express.Router();

router.use(validateToken, isUserValid);

router.get('/', getUsersPost);

router.get('/posts', getAllPosts);

router.get('/:postId', checkPostId, getUserPostById);

router.post('/create-post', emptyPost, createPost);

router.patch('/publish-post/:postId', checkPostId, publishPost);

router.put('/update/:postId', checkPostId, emptyPost, updatePost);

router.delete('/delete/:username/:postId', deletePost);

export default router;
