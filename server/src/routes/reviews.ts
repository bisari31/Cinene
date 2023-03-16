import { Request, Router, Response } from 'express';

// import { ICookiesRequest, authenticate } from './middleware';

import Review, { ReviewInterface } from '../models/review';

// interface CustomRequest extends Request {
//   params: { type: string; id: string };
//   query: {
//     userId?: string;
//   };
// }

// interface ICustomRequest extends ICookiesRequest {
//   params: { id: string };
// }

// interface IData {
//   message?: string;
//   success: boolean;
//   review?: ReviewInterface;
//   reviews?: ReviewInterface[];
//   hasReview?: null | ReviewInterface;
// }

const router = Router();

// router.post(
//   '/',
//   authenticate,
//   async (req: ICustomRequest<ReviewInterface>, res: Response<IData>) => {
//     try {
//       const review = await Review.create({
//         contentId: req.body.contentId,
//         contentType: req.body.contentType,
//         rating: req.body.rating,
//         comment: req.body.comment,
//         userId: req.user?._id,
//       });

//       await Review.updateRatings(req.body.contentId, req.body.contentType);

//       res.json({ success: true, review });
//     } catch (err) {
//       res.status(404).json(...err);
//     }
//   },
// );

// router.patch(
//   '/:id',
//   authenticate,
//   async (req: PatchRequst<ReviewInterface>, res: Response<IData>) => {
//     try {
//       const review = await Review.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: { comment: req.body.comment, rating: req.body.rating } },
//       );

//       await Review.updateRatings(req.body.contentId, req.body.contentType);
//       if (!review) throw Error();
//       res.json({ success: true, review });
//     } catch (err) {
//       res.status(404).json({ success: false, message: '리뷰 찾기 실패' });
//     }
//   },
// );

// router.get('/:type/:id', async (req: CustomRequest, res: Response<IData>) => {
//   try {
//     const { id, type } = req.params;
//     const reviews = await Review.find({
//       contentType: type,
//       contentId: id,
//     }).populate('userId');

//     if (!req.query.userId) {
//       res.json({ success: true, reviews, hasReview: null });
//       return;
//     }
//     const myReview = await Review.findOne({
//       contentType: type,
//       contentId: id,
//       userId: req.query.userId,
//     });
//     res.json({ success: true, reviews, hasReview: myReview });
//   } catch (err) {
//     res.status(500).json({ success: false, message: '서버 에러' });
//   }
// });

// router.delete('/:id', authenticate, async (req, res: Response<IData>) => {
//   try {
//     const review = await Review.findByIdAndDelete(req.params.id);
//     if (!review) {
//       res.status(400).json({ success: false, message: '리뷰를 찾을 수 없음' });
//     } else {
//       await Review.updateRatings(review?.contentId, review?.contentType);
//       res.json({ success: true });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: '서버 에러' });
//   }
// });

export default router;
