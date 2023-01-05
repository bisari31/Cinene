import { Router, Request } from 'express';

const router = Router();

// router.get('/:type/:id', async (req, res) => {
//   try {
//     const content = await Content.find({
//       tmdbId: req.params.id,
//       type: req.params.type,
//     });
//     // const content = await Rating.find({
//     //   tmdbId: req.body.tmdbId,
//     //   type: req.body.tmdbId,
//     // });
//     console.log(content);
//   } catch (err) {}
// });

export default router;
