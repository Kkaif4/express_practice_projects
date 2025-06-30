import express from 'express';
import {
  checkLoginInfo,
  validateToken,
  validateUpdateInfo,
} from '../middleware/protect.js';
import {
  forgotEmail,
  getUser,
  updateUser,
} from '../controller/userController.js';
import { validate } from '../controller/authController.js';

const router = express.Router();

router.get('/', validateToken, getUser);
router.put('/update', validateToken, validateUpdateInfo, updateUser);
router.post('/forgot-email', checkLoginInfo, forgotEmail);

export default router;
