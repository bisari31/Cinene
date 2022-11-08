import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import commentRouter from './routes/comment';

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI!;

mongoose.connect(DB_URI, { dbName: 'test' }, (err) => {
  if (err) console.log(err);
  console.log('db 연결 성공');
});

app.use(cookieParser());
app.use(express.json());
app.use(express.static('uploads'));
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter);

app.use((req, res) => {
  res.status(404).send('not found');
});

app.listen(PORT, () => {
  console.log(PORT, '번 PORT on!');
});
