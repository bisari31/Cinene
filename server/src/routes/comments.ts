import { Router } from 'express';
// import { ObjectId } from 'mongoose';

// import { authenticate, IRequest } from './middleware';

// import Comment from '../models/comment';

// interface Body {
//   comment: string;
//   contentId: ObjectId;
//   responseTo?: ObjectId;
// }

const router = Router();

// router.post('/', authenticate, async (req: IRequest<Body>, res) => {
//   try {
//     const comment = await Comment.create({
//       comment: req.body.comment,
//       contentId: req.body.contentId,
//       userId: req.user?._id,
//       responseTo: req.body.responseTo,
//     });
//     res.json({ success: true, comment });
//   } catch (err) {
//     res.json({ success: false, messege: '댓글 등록 실패' });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const comments = await Comment.find({ contentId: req.params.id }).populate(
//       'userId',
//     );
//     res.json({ success: true, comments });
//   } catch (err) {
//     res.json({ success: false, comments: null, message: '댓글 조회 실패 ' });
//   }
// });

export default router;
