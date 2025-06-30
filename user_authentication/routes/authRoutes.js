import express from 'express';
import { login, register, validate } from '../controller/authController.js';
import {
  checkLoginInfo,
  checkRegisterInfo,
  validateToken,
} from '../middleware/protect.js';
import { forgotEmail } from '../controller/userController.js';

const router = express.Router();

router.post('/register', checkRegisterInfo, register);
router.post('/validate', validateToken, validate);
router.post('/login', checkLoginInfo, login);
router.post('/forgot-email', checkLoginInfo, forgotEmail);

export default router;
