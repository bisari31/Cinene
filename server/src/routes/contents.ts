import { Router, Request, Response } from 'express';
import Content, { ContentInterface } from '../models/content';
import { CustomResponse } from '../types/express';
// import { CustomResponse } from './user';

// import Content, { ContentInterface } from '../models/content';

// export interface CustomRequest<T> extends Request {
//   body: T;
// }

const router = Router();

router.get(
  '/:type/:id',
  async (
    req: Request<{ type: string; id: string }>,
    res: CustomResponse<{ content?: ContentInterface }>,
  ) => {
    const { id: tmdbId, type } = req.params;
    try {
      const content = await Content.findOne({
        type,
        tmdbId,
      });
      if (!content)
        res.json({
          success: false,
          message: '콘텐츠 없음',
        });
      else res.json({ success: true, content });
    } catch (err) {
      res.status(400).json({
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
    // if (!req.body.title) return;

    const hasCotent = await Content.findOne({
      tmdbId,
      content_type: contentType,
    });
    if (!hasCotent) {
      const content = await Content.create({
        title,
        poster_url: posterUrl,
        content_type: contentType,
        tmdbId,
      });
      res.json({ success: true, content });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: '콘텐츠 생성 오류' });
  }
});

router.get('/top-rated', async (req, res) => {
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
