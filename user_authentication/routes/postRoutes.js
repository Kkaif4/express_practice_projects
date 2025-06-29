import express from 'express';
import {
  createPost,
  deletePost,
  getPostsOfUserByPostId,
  getUsersPost,
  publishPost,
  updatePost,
} from '../controller/postController.js';

const router = express.Router();

// router.get('/', getAllPosts);
router.get('/', getUsersPost);

router.get('/:postId', getPostsOfUserByPostId);

router.post('/create-post/', createPost);
router.patch('/publish-post/:postId', publishPost);

router.put('/update/:postId', updatePost);

router.delete('/delete/:username/:postId', deletePost);

export default router;
