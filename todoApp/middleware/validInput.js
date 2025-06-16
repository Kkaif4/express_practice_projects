//check for valid input
export const validInput = (req, res, next) => {
  const { task, completed } = req.body;

  // Ensure task is a string and not empty
  if (task && typeof task !== 'string') {
    return res.status(400).json({ message: 'Task must be a string' });
  }
  if (task && task.trim() === '') {
    return res.status(400).json({ message: 'Task cannot be empty' });
  }
  // Ensure completed is a boolean if provided
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Task status must be a true or false' });
  }

  next();
};
