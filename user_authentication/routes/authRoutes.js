import express from 'express';
import { login, register } from '../controller/authController.js';
import { checkRegisterInfo } from '../middleware/protect.js';

const router = express.Router();

router.post('/register', checkRegisterInfo, register);
router.post('/login', login);

export default router;
