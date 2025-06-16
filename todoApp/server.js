import express from 'express';
//routes
import taskRoutes from './router/taskRoutes.js';

import path from 'path';
import connectDB from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to the database
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Todo App API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
