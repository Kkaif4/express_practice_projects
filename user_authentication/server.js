import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorhandler } from './middleware/errorhandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

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

/* 
Register: username, firstName, lastName, email, password (password must be at least 8 characters, one capital, one special character and one number)
Login: username/email, password
Forgot email: username, password
Forgot password: username/email
User Update: update details - username, firstName, lastName, email
*/
