import express from 'express';
import {
  isUserValid,
  validateToken,
  validateUpdateInfo,
} from '../middleware/protect.js';
import { getUser, updateUser } from '../controller/userController.js';

const router = express.Router();
router.use(validateToken, isUserValid);

router.get('/', getUser);

router.put('/update', validateUpdateInfo, updateUser);

export default router;
