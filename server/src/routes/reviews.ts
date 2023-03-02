import { Request, Router, Response } from 'express';

import Review, { IReview } from '../models/review';

import { authenticate, IRequest } from './middleware';

interface CustomRequest extends Request {
  params: { type: string; id: string };
  query: {
    userId?: string;
  };
}

interface PatchRequst<T> extends IRequest<T> {
  params: { id: string };
}

interface IData {
  message?: string;
  success: boolean;
  review?: IReview;
  reviews?: IReview[];
  hasReview?: null | IReview;
}

const router = Router();

router.post(
  '/',
  authenticate,
  async (req: IRequest<IReview>, res: Response<IData>) => {
    try {
      const review = await Review.create({
        contentId: req.body.contentId,
        contentType: req.body.contentType,
        rating: req.body.rating,
        comment: req.body.comment,
        userId: req.user?._id,
      });

      await Review.updateRatings(req.body.contentId, req.body.contentType);

      res.json({ success: true, review });
    } catch (err) {
      res.status(404).json(...err);
    }
  },
);

router.patch(
  '/:id',
  authenticate,
  async (req: PatchRequst<IReview>, res: Response<IData>) => {
    try {
      const review = await Review.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { comment: req.body.comment, rating: req.body.rating } },
      );

      await Review.updateRatings(req.body.contentId, req.body.contentType);

      if (!review) throw { success: false, message: '리뷰 찾기 실패' };

      res.json({ success: true, review });
    } catch (err) {
      res.status(404).json(...err);
    }
  },
);

router.get('/:type/:id', async (req: CustomRequest, res: Response<IData>) => {
  try {
    const { id, type } = req.params;
    const reviews = await Review.find({
      contentType: type,
      contentId: id,
    }).populate('userId');

    if (!req.query.userId) {
      return res.json({ success: true, reviews, hasReview: null });
    }

    const myReview = await Review.findOne({
      contentType: type,
      contentId: id,
      userId: req.query.userId,
    });
    res.json({ success: true, reviews, hasReview: myReview });
  } catch (err) {
    res.status(500).json({ success: false, message: '서버 에러' });
  }
});

router.delete('/:id', authenticate, async (req, res: Response<IData>) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review)
      return res
        .status(400)
        .json({ success: false, message: '리뷰를 찾을 수 없음' });
    await Review.updateRatings(review?.contentId, review?.contentType);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: '서버 에러' });
  }
});

export default router;
