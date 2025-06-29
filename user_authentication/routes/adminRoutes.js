import express from 'express';
import { getAllPosts, getAllUser } from '../controller/adminController.js';
import { validateAdmin, validateToken } from '../middleware/protect.js';

const router = express.Router();

router.get('/users', validateToken, validateAdmin, getAllUser);
router.get('/posts', validateToken, validateAdmin, getAllPosts);
export default router;
