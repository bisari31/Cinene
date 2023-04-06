import { Request, Router } from 'express';

import { CustomRequest, CustomResponse } from '../types/express';
import authenticate from '../utils/middleware';

import { ContentInterface } from '../models/content';
import Like, { LikeInterface } from '../models/Like';

const router = Router();

router.get(
  '/:type/:id',
  async (
    req: Request<{ type: string; id: string }, {}, {}, { userId: string }>,
    res: CustomResponse<{ likes?: number; isLike?: boolean }>,
  ) => {
    try {
      const { type, id } = req.params;
      const typed = type === 'content' ? 'content' : 'comment';
      const likes = await Like.find({ [typed]: id });
      if (!req.query.userId) {
        res.json({ success: true, likes: likes.length, isLike: false });
        return;
      }
      const document = await Like.findOne({
        liked_by: req.query.userId,
        [typed]: id,
      });
      res.json({
        success: true,
        likes: likes.length,
        isLike: !!document,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: '좋아요 조회 실패' });
    }
  },
);

router.post(
  '/:type/:id',
  authenticate(),
  async (
    req: CustomRequest<{ type: string; id: string }>,
    res: CustomResponse,
  ) => {
    try {
      const { id, type } = req.params;
      const typed = type === 'content' ? 'content' : 'comment';
      const hasLike = await Like.findOneAndDelete({
        liked_by: req.user?._id,
        [typed]: id,
      });
      if (!hasLike) {
        await Like.create({
          [typed]: id,
          liked_by: req.user?._id,
        });
      }
      res.json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      res.status(500).json({ success: false, message: '좋아요 증감 실패' });
    }
  },
);

router.get(
  '/favorites',
  authenticate(),
  async (
    req: CustomRequest,
    res: CustomResponse<{ contents?: LikeInterface[] }>,
  ) => {
    try {
      const contents = await Like.find<ContentInterface>({
        liked_by: req.user?._id,
      })
        .exists('content', true)
        .populate('content')
        .lean();

      res.json({ success: true, contents, accessToken: req.accessToken });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: '즐겨찾기 목록 조회 실패' });
    }
  },
);

export default router;
