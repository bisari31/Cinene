import { Request, Router } from 'express';
import Content from '../models/content';
import Review, { IReview } from '../models/review';
import { authenticate } from './middleware';
import { IRequest } from './middleware';

interface CustomRequest extends Request {
  params: { type: string; id: string };
  query: {
    userId?: string;
  };
}

interface PatchRequst<T> extends IRequest<T> {
  params: { id: string };
}

const router = Router();

router.post('/', authenticate, async (req: IRequest<IReview>, res) => {
  try {
    const document = await Review.create({
      contentId: req.body.contentId,
      contentType: req.body.contentType,
      rating: req.body.rating,
      comment: req.body.comment,
      userId: req.user?._id,
    });
    const content: IReview[] = await Review.find({
      contentId: req.body.contentId,
      contentType: req.body.contentType,
    });
    const total = content.reduce((acc, cur) => (acc += cur.rating), 0);
    if (content) {
      await Content.findOneAndUpdate(
        { _id: document.contentId },
        {
          $set: {
            average: total / content.length,
            votes: content.length,
          },
        },
      );
    }
    res.json({ success: true, document });
  } catch (err) {
    res.status(404).json({ success: false, message: 'sever error' });
  }
});

router.patch('/:id', authenticate, async (req: PatchRequst<IReview>, res) => {
  try {
    const document = await Review.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { comment: req.body.comment, rating: req.body.rating } },
    );
    const content: IReview[] = await Review.find({
      contentId: req.body.contentId,
      contentType: req.body.contentType,
    });
    const total = content.reduce((acc, cur) => (acc += cur.rating), 0);
    if (content) {
      await Content.findOneAndUpdate(
        { _id: req.body.contentId },
        {
          $set: {
            average: total / content.length,
            votes: content.length,
          },
        },
      );
    }
    res.json({ success: true, document });
  } catch (err) {
    res.status(404).json({ success: false, message: 'sever error' });
  }
});

router.get('/:type/:id', async (req: CustomRequest, res) => {
  try {
    const { id, type } = req.params;
    const documents = await Review.find({
      contentType: type,
      contentId: id,
    }).populate('userId');
    if (!req.query.userId) {
      console.log('1');
      return res.json({ success: true, documents, hasReview: null });
    } else {
      const myReview = await Review.findOne({
        contentType: type,
        contentId: id,
        userId: req.query.userId,
      });
      res.json({ success: true, documents, hasReview: myReview });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: '서버 에러 ' });
  }
});

export default router;
