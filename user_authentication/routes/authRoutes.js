import express from 'express';
import { login, register, validate } from '../controller/authController.js';
import {
  checkLoginInfo,
  checkRegisterInfo,
  checkResetPassword,
  isUserValid,
  validateToken,
} from '../middleware/protect.js';
import {
  forgotEmail,
  forgotPassword,
  resetPassword,
} from '../controller/userController.js';

const router = express.Router();

router.post('/register', checkRegisterInfo, register);
router.post('/user-validation', validateToken, validate);
router.post('/login', checkLoginInfo, login);
router.post('/forgot-email', validateToken, checkLoginInfo, forgotEmail);
router.post(
  '/forgot-password',
  forgotPassword
);
router.post('/validate-code', checkResetPassword, resetPassword);
export default router;
