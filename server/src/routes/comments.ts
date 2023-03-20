import { Request, Router } from 'express';
import { ObjectId } from 'mongoose';

import { CustomRequest, CustomResponse } from '../types/express';
import authenticate from '../utils/middleware';
import Comment, { CommentInterface } from '../models/comment';

interface Body {
  comment: string;
  contentId: ObjectId;
  responseTo?: ObjectId;
}

const router = Router();

router.post(
  '/',
  authenticate,
  async (req: CustomRequest<{}, {}, Body>, res: CustomResponse) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        content: req.body.contentId,
        author: req.user?._id,
        responseTo: req.body.responseTo,
      });
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: '댓글 등록 실패' });
    }
  },
);

router.get(
  '/:id',
  async (
    req: Request<{ id: string }>,
    res: CustomResponse<{ comments?: CommentInterface[] }>,
  ) => {
    try {
      const comments = await Comment.find({
        content: req.params.id,
      }).populate('author');
      res.json({ success: true, comments });
    } catch (err) {
      res.status(400).json({ success: false, message: '댓글 조회 실패 ' });
    }
  },
);

export default router;
