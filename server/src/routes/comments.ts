import { Request, Router } from 'express';
import { isObjectIdOrHexString, ObjectId, Types } from 'mongoose';

import { authenticate, IRequest } from './middleware';

import Comment from '../models/comment';

interface Body {
  comment: string;
  contentId: ObjectId;
}

const router = Router();

router.post('/', authenticate, async (req: IRequest<Body>, res) => {
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      contentId: req.body.contentId,
      userId: req.user?._id,
    });
    res.json({ success: true, comment });
  } catch (err) {}
});

router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.find({ contentId: req.params.id }).populate(
      'userId',
    );
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ success: false, comments: null, message: '댓글 조회 실패 ' });
  }
});

export default router;
