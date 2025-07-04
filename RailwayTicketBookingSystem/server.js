import express from 'express';
import connectDB from '../config/db.js';

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
  connectDB;
});

//?  Learn data modeling examples, advantages, different types of data modeling considerations, and how they can be applied to your own
