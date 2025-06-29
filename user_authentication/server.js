import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/adminRoutes.js';
import { validateToken } from './middleware/protect.js';
import { errorhandler } from './middleware/errorhandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
// app.use('/posts', postRoutes);
app.use('/user/posts', validateToken, postRoutes);

app.use('/admin', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'hello, Root API hit' });
});

app.use((req, res, next) => {
  const error = new Error('Invalid API hit');
  error.status = 404;
  next(error);
});

app.use(errorhandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server is listening on port ${process.env.PORT}`);
});
