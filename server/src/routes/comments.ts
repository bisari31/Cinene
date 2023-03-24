import { Request, Router } from 'express';
import { ObjectId } from 'mongoose';

import { CustomRequest, CustomResponse } from '../types/express';
import authenticate from '../utils/middleware';
import Comment, { CommentInterface } from '../models/comment';
import Like from '../models/Like';

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
      res.status(201).json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      res.status(500).json({ success: false, message: '댓글 등록 실패' });
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
      res.status(500).json({ success: false, message: '댓글 조회 실패' });
    }
  },
);

router.delete(
  '/:id',
  authenticate,
  async (req: CustomRequest<{ id: string }>, res: CustomResponse) => {
    try {
      const hasComment = await Comment.findOne({ responseTo: req.params.id });
      if (hasComment) {
        return res.status(409).json({
          success: false,
          message: '답글이 존재하여 삭제할 수 없습니다.',
          accessToken: req.accessToken,
        });
      }
      await Like.deleteMany({ comment: req.params.id });
      await Comment.deleteOne({ _id: req.params.id });
      return res.json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      return res.status(500).json({ success: false, message: '서버 에러 ' });
    }
  },
);

router.patch('/:id', async (req: Request<{ id: string }>, res) => {
  console.log(req.params.id);
});

export default router;
