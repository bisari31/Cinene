import { Request, Router } from 'express';
import Content from '../models/content';
import Rating, { IRating } from '../models/rating';
import { authenticate } from './middleware';
import { IRequest } from './middleware';

interface CustomRequest extends Request {
  params: { type: string; id: string };
  query: {
    userId?: string;
  };
}

const router = Router();

router.post('/', authenticate, async (req: IRequest<IRating>, res) => {
  try {
    console.log(req.body.isEditing);
    const document = await Rating.create({
      contentId: req.body.contentId,
      contentType: req.body.contentType,
      rating: req.body.rating,
      review: req.body.review,
      userId: req.user?._id,
    });
    const content = await Content.findOne({
      type: document.contentType,
      _id: document.contentId,
    });
    if (content) {
      const average = (content.average + document.rating) / (content.count + 1);
      await Content.updateOne(
        { _id: content._id },
        {
          average,
          count: content.count + 1,
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
    const documents = await Rating.find({
      contentType: type,
      contentId: id,
    }).populate('userId');
    if (!req.query.userId) {
      return res.json({ success: true, documents, hasReview: null });
    }
    const myReview = await Rating.findOne({
      contentType: type,
      contentId: id,
      userId: req.query.userId,
    });
    res.json({ success: true, documents, hasReview: myReview });
  } catch (err) {
    res.status(400).json({ success: false, message: '서버 에러 ' });
  }
});

export default router;
