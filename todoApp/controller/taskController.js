import taskModel from '../models/taskModel.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    if (tasks.length === 0) {
      console.log('no tasks found');
      return res.status(404).json({ message: 'No tasks found' });
    }
    console.log('Tasks fetched successfully:', tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

//get a single task by id
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    console.log('Task fetched successfully:', task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

export const createTask = async (req, res) => {
  const { task } = req.body;
  const oldTask = await taskModel.findOne({ task });
  if (oldTask) {
    return res.status(400).json({ message: 'Task already exists' });
  }
  try {
    const newTask = new taskModel({ task });
    await newTask.save();
    console.log('New task created:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};
// update the task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    console.log('Task updated:', updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// update the task status
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    console.log('Task status updated:', updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
};

//delete all tasks
export const deleteAllTasks = async (req, res) => {
  try {
    await taskModel.deleteMany();
    console.log('All tasks deleted successfully');
    res.status(200).json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all tasks', error });
  }
};
