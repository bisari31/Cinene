import { Request, Router } from 'express';

import { CustomRequest, CustomResponse } from '../types/express';
import { NotFoundError } from '../utils/error';
import authenticate from '../utils/middleware';

import Review, { ReviewInterface } from '../models/review';

const router = Router();

router.post(
  '/',
  authenticate,
  async (
    req: CustomRequest<{}, {}, Omit<ReviewInterface, '_id' | 'author'>>,
    res: CustomResponse,
  ) => {
    try {
      const { comment, content, rating, content_type: contentType } = req.body;
      await Review.create({
        content,
        content_type: contentType,
        rating,
        comment,
        author: req.user?._id,
      });
      await Review.updateRating(content, contentType);
      res.json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      res.status(500).json({ success: false, message: '리뷰 등록 실패' });
    }
  },
);

router.patch(
  '/:id',
  authenticate,
  async (
    req: CustomRequest<{ id: string }, {}, ReviewInterface>,
    res: CustomResponse,
  ) => {
    const { id } = req.params;
    const { comment, rating, content, content_type: ContentType } = req.body;
    try {
      const review = await Review.findByIdAndUpdate(id, {
        $set: { comment, rating },
      });
      if (!review) throw Error();
      await Review.updateRating(content, ContentType);
      res.json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      res.status(500).json({ success: false, message: '리뷰 수정 실패' });
    }
  },
);

router.get(
  '/:type/:id',
  async (
    req: Request<{ type: string; id: string }, {}, {}, { userId: string }>,
    res: CustomResponse<{
      reviews?: ReviewInterface[];
      hasReview?: ReviewInterface | null;
    }>,
  ) => {
    try {
      const { id, type } = req.params;
      const reviews = await Review.find({
        content_type: type,
        content: id,
      })
        .populate('author')
        .lean();

      if (!req.query.userId) {
        res.json({ success: true, reviews });
        return;
      }
      const myReview = await Review.findOne({
        content_type: type,
        content: id,
        author: req.query.userId,
      });
      res.json({ success: true, reviews, hasReview: myReview });
    } catch (err) {
      res.status(500).json({ success: false, message: '리뷰 조회 실패' });
    }
  },
);

router.delete(
  '/:id',
  authenticate,
  async (req: CustomRequest<{ id: string }>, res: CustomResponse) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) throw new NotFoundError('리뷰 삭제 실패');
      await Review.updateRating(review?.content, review?.content_type, true);
      res.json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ success: false, message: err.message });
      } else {
        res.status(500).json({ success: false, message: '서버 에러' });
      }
    }
  },
);

export default router;
