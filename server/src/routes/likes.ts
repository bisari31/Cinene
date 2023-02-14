import { Request, Router } from 'express';
import { IRequest } from './middleware';
import { authenticate } from './middleware';

import Like from '../models/Like';
import { IUser } from '../models/user';

interface CustomRequest extends Request {
  params: { id: string; type: 'commentId' | 'contentId' };
  query: { userId?: string };
  user?: IUser;
}

const router = Router();

router.get('/:type/:id', async (req: CustomRequest, res) => {
  try {
    const { type, id } = req.params;
    const likes = await Like.find({ [type]: id });
    if (!req.query.userId) {
      return res.json({ success: true, likes: likes.length, isLike: false });
    }
    const document = await Like.findOne({
      userId: req.query.userId,
      [type]: id,
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

router.post('/:type/:id', authenticate, async (req: CustomRequest, res) => {
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

router.get('/favorites', authenticate, async (req: IRequest<null>, res) => {
  try {
    console.log('qwe');
    const contents = await Like.find({ userId: req.user?._id })
      .exists('contentId', true)
      .populate('contentId');

    res.json({ success: true, contents });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: '즐겨찾기 목록 조회 실패' });
  }
});
export default router;
