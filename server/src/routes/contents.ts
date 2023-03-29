import { Router, Request } from 'express';

import { CustomResponse } from '../types/express';

import Content, { ContentInterface } from '../models/content';

const router = Router();

router.get(
  '/:type/:tmdbId',
  async (
    req: Request<{ type: string; tmdbId: string }>,
    res: CustomResponse<{ content?: ContentInterface }>,
  ) => {
    const { tmdbId, type } = req.params;
    try {
      const content = await Content.findOne({
        type,
        tmdbId,
      }).lean();
      if (!content)
        res.json({
          success: false,
          message: '콘텐츠 없음',
        });
      else res.json({ success: true, content });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: '콘텐츠 찾을 수 없음',
      });
    }
  },
);

router.post('/', async (req: Request<{}, {}, ContentInterface>, res) => {
  try {
    const {
      title,
      tmdbId,
      content_type: contentType,
      poster_url: posterUrl,
    } = req.body;
    const hasCotent = await Content.findOne({
      tmdbId,
      content_type: contentType,
    }).lean();
    if (!hasCotent) {
      const content = await Content.create({
        title,
        poster_url: posterUrl,
        content_type: contentType,
        tmdbId,
      });
      res.json({ success: true, content });
    } else {
      res.json({ success: true, content: hasCotent });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: '콘텐츠 생성 오류' });
  }
});

router.get(
  '/top-rated',
  async (req, res: CustomResponse<{ contents?: ContentInterface[] }>) => {
    try {
      const contents = await Content.find()
        .sort({ votes: -1 })
        .limit(20)
        .lean();
      res.json({ success: true, contents });
    } catch (err) {
      res.status(500).json({ success: false, message: '콘텐츠 찾을 수 없음' });
    }
  },
);

export default router;
