import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { errorhandler } from './middleware/errorhandler.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'root API access - hello im root ', success: true });
});

app.use((req, res, next) => {
  const error = new Error('Invalid API hit');
  error.status(404);
  next(error);
});

app.use(errorhandler);
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
