import express from 'express';
import { login, register } from '../controller/authController.js';
import { checkLoginInfo, checkRegisterInfo } from '../middleware/protect.js';

const router = express.Router();

router.post('/register', checkRegisterInfo, register);
router.post('/login', checkLoginInfo, login);

export default router;
