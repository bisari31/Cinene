import { Router, Request } from 'express';

import Content, { IContent } from '../models/content';

export interface CustomRequest<T> extends Request {
  body: T;
}

const router = Router();

router.get('/:type/:id', async (req, res) => {
  try {
    const content = await Content.findOne({
      type: req.params.type,
      tmdbId: req.params.id,
    });
    if (!content)
      return res.json({
        success: false,
        message: '콘텐츠 없음',
        content: null,
      });
    res.json({ success: true, content });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: '콘텐츠 찾을 수 없음', content: null });
  }
});

router.post('/', async (req: CustomRequest<IContent>, res) => {
  try {
    if (!req.body.name) return;
    const content = await Content.create({
      name: req.body.name,
      poster: req.body.poster,
      type: req.body.type,
      tmdbId: req.body.tmdbId,
    });
    res.json({ success: true, content });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: '콘텐츠 생성 오류', content: null });
  }
});

router.get('/topRated', async (req, res) => {
  try {
    const contents = await Content.find().sort({ average: -1 }).limit(20);
    res.json({ success: true, contents });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: '콘텐츠 찾을 수 없음', content: null });
  }
});

export default router;
