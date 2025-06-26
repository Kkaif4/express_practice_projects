import express from 'express';
import {
  getAllPosts,
  getPostsByUser,
  getPostsByUserId,
} from '../controller/postController.js';

const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/:user', getPostsByUser);
router.get('/posts/:user/:id', getPostsByUserId);

export default router;
