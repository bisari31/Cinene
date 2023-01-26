import { Request, Router } from 'express';

import { authenticate } from './middleware';
import { IUser } from '../types/user';

import Like from '../models/like';

interface IRequest extends Request {
  params: { id: string; type: 'commentId' | 'contentId' };
  query: { userId?: string };
  user?: IUser;
}

const router = Router();

router.get('/:type/:id', async (req: IRequest, res) => {
  try {
    const type = req.params.type;
    const likes = await Like.find({ [type]: req.params.id });
    if (!req.query.userId) {
      return res.json({ success: true, likes: likes.length, isLike: false });
    }
    console.log(likes);
    const document = await Like.findOne({
      userId: req.query.userId,
      [type]: req.params.id,
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

router.post('/:type/:id', authenticate, async (req: IRequest, res) => {
  try {
    const type = req.params.type;
    const document = await Like.findOne({
      userId: req.user?._id,
      [type]: req.params.id,
    });
    if (document) {
      await Like.deleteOne({ _id: document._id });
      return res.json({ success: true });
    }
    await Like.create({
      [type]: req.params.id,
      userId: req.user?._id,
    });
    return res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: '좋아요 증감 실패' });
    console.error(err);
  }
});
export default router;
