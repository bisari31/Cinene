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

export default router;
