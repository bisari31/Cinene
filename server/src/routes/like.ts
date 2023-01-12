import { Request, Router } from 'express';

import { authenticate } from './middleware';
import { IUser } from '../types/user';

import Like from '../models/like';

interface IRequest extends Request {
  query: { id: string; userId?: string };
  user?: IUser;
}

const router = Router();

router.get('/', async (req: IRequest, res) => {
  try {
    const likes = await Like.find({ contentId: req.query.id });
    if (!req.query.userId) {
      return res.json({ success: true, likes: likes.length, isLike: false });
    }

    const document = await Like.findOne({
      userId: req.query.userId,
      contentId: req.query.id,
    });
    res.json({
      success: true,
      likes: likes.length,
      isLike: !!document,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: '좋아요 조회 실패' });
    console.error(err);
  }
});

router.post('/', authenticate, async (req: IRequest, res) => {
  try {
    const document = await Like.findOne({
      userId: req.user?._id,
      contentId: req.query.id,
    });
    if (document) {
      await Like.deleteOne({ _id: document._id });
      return res.json({ success: true });
    }
    await Like.create({
      contentId: req.query.id,
      userId: req.user?._id,
    });
    return res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: '좋아요 증감 실패' });
    console.error(err);
  }
});

export default router;
