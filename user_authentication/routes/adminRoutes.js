import express from 'express';
import {
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

export default router;
