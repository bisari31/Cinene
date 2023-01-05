import { Request, Response, Router } from 'express';
import Comment from '../models/comment_prev';
import Post from '../models/post_prev';
import { authenticate } from './middleware_prev';

const router = Router();

interface IBody {
  comment: string;
  postId: number;
  writer: string;
}

interface CustomRequest<T> extends Request {
  body: T;
}

router.post(
  '/create',
  authenticate,
  async (req: CustomRequest<IBody>, res: Response) => {
    try {
      console.log(req.body);
      const comment = await Comment.create(req.body);
      const postId = await Post.findOne({ _id: req.body.postId });
      await postId?.addCountComments();
      const newComment = await Comment.findOne({ _id: comment._id }).populate(
        'writer',
      );
      res.status(201).json(newComment);
    } catch (err) {
      res.status(400).send('댓글 등록 오류');
    }
  },
);

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const response = await Comment.find({ postId: req.params.id }).populate(
      'writer',
    );
    res.json(response);
  } catch (err) {
    res.status(400).send('댓글 찾기 실패');
  }
});

export default router;
