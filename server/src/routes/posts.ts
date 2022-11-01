import { Router } from 'express';
import Post from '../models/post';
import { authenticate, AuthRequest } from './middleware';

const router = Router();

router.post('/write', authenticate, async (req: AuthRequest, res) => {
  try {
    const postNum = await Post.findOne({}, { numId: 1, _id: 0 }).sort({
      _id: -1,
    });
    const post = await Post.create({
      writer: req.user?._id,
      numId: !postNum?.numId ? 1 : postNum.numId + 1,
      ...req.body,
    });
    res.status(201).json({ success: true, post });
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('writer').sort({ _id: -1 });
    res.status(201).json({ success: true, posts });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ numId: req.params.id }).populate(
      'writer',
    );
    if (!post) throw new Error('데이터가 없습니다.');
    res.json(post);
  } catch (err) {
    res.status(400).send({ success: false, err: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      numId: req.params.id,
      writer: req.body.id,
    });
    if (!post) throw new Error('삭제 실패');
    res.json({ success: true, post });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        numId: req.params.id,
        writer: req.body.userId,
      },
      {
        title: req.body.title,
        body: req.body.body,
      },
    );
    if (!post) throw new Error('변경 실패');
    res.json(post);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
