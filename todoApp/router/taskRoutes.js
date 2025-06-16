import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from '../controller/taskController.js';
import { validInput } from '../middleware/validInput.js';
const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);

router.post('/', validInput, createTask);
router.put('/:id', validInput, updateTask);

router.delete('/:id', deleteTask);
router.delete('/', deleteAllTasks);
export default router;
