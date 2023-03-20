import { Request, Router } from 'express';
import { ContentInterface } from '../models/content';

import Like, { LikeInterface } from '../models/Like';
import { CustomRequest, CustomResponse } from '../types/express';
import authenticate from '../utils/middleware';

const router = Router();

router.get(
  '/:type/:id',
  async (
    req: Request<{ type: string; id: string }, {}, {}, { userId: string }>,
    res: CustomResponse<{ likes?: number; isLike?: boolean }>,
  ) => {
    try {
      const { type, id } = req.params;
      const likes = await Like.find({ [type]: id });
      if (!req.query.userId) {
        res.json({ success: true, likes: likes.length, isLike: false });
        return;
      }
      const document = await Like.findOne({
        liked_by: req.query.userId,
        [type]: id,
      });
      res.json({
        success: true,
        likes: likes.length,
        isLike: !!document,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: '좋아요 조회 실패' });
    }
  },
);

router.post(
  '/:type/:id',
  authenticate,
  async (
    req: CustomRequest<{ type: string; id: string }>,
    res: CustomResponse,
  ) => {
    try {
      const { type, id } = req.params;
      const document = await Like.findOne({
        liked_by: req.user?._id,
        [type]: id,
      });
      if (document) {
        await Like.findByIdAndDelete(document._id);
        res.json({ success: true });
        return;
      }
      await Like.create({
        [type]: id,
        liked_by: req.user?._id,
      });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: '좋아요 증감 실패' });
    }
  },
);

router.get(
  '/favorites',
  authenticate,
  async (req: CustomRequest, res: CustomResponse<{ contents?: any }>) => {
    try {
      const contents = await Like.find({ liked_by: req.user?._id })
        .exists('content', true)
        .populate('content');

      res.json({ success: true, contents });
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: '즐겨찾기 목록 조회 실패' });
    }
  },
);

export default router;
