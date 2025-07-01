import express from 'express';
import {
  deleteAllPosts,
  deletePostById,
  deleteUserById,
  getAllPosts,
  getAllUser,
} from '../controller/adminController.js';
import { validateAdmin, validateToken } from '../middleware/protect.js';

const router = express.Router();

router.use(validateToken, validateAdmin);
router.get('/users', getAllUser);
router.get('/posts', getAllPosts);
router.delete('/delete-post/:id', deletePostById);
router.delete('/delete-user/:id', deleteUserById);
router.delete('/delete/users', deleteAllPosts);
router.delete('/delete/posts', deleteAllPosts);

export default router;
