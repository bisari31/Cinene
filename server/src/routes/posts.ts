import { Router } from 'express';
import Comment from '../models/comment';
import Post from '../models/post';
import { authenticate, AuthRequest } from './middleware';

const router = Router();

router.post('/write', authenticate, async (req: AuthRequest, res) => {
  try {
    const postNum = await Post.findOne({}, { seq: 1, _id: 0 }).sort({
      _id: -1,
    });
    const post = await Post.create({
      writer: req.user?._id,
      seq: !postNum?.seq ? 1 : postNum.seq + 1,
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
    console.log(posts);
    res.status(201).json({ success: true, posts });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, err: '게시글을 불러오지 못했습니다.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate('writer');
    if (!post) throw new Error('데이터가 없습니다.');
    const newPost = await post?.addCountViews();
    res.json(newPost);
  } catch (err) {
    res.status(400).send({ success: false, err: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
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
        _id: req.params.id,
        writer: req.body.userId,
      },
      {
        title: req.body.title,
        body: req.body.body,
      },
    );
    if (!post) throw new Error('변경 실패');
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
