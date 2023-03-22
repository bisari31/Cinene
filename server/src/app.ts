import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user';
import contentsRouter from './routes/contents';
import commentRouter from './routes/comments';
import reviewsRouter from './routes/reviews';
import likesRouter from './routes/likes';

dotenv.config();
const app = express();

const { PORT } = process.env;
const DB_URI = process.env.DB_URL as string;

mongoose.connect(DB_URI, { dbName: 'cinene' }, (err) => {
  if (err) console.log(err);
  console.log('db 연결 성공');
});

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/contents', contentsRouter);
app.use('/comments', commentRouter);
app.use('/likes', likesRouter);
app.use('/reviews', reviewsRouter);

app.use((req, res) => {
  res.status(404).send('not found');
});

app.listen(PORT, () => {
  console.log(PORT, '번 PORT on!');
});
