import { NextFunction, Router, Response, Request } from 'express';
import multer, { MulterError } from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';

import path from 'path';
import authenticate from '../utils/middleware';
import User, { UserInterface } from '../models/user';
import { CustomRequest, CustomResponse } from '../types/express';

dotenv.config();
const router = Router();

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? '',
    secretAccessKey: process.env.S3_SECRET_KEY ?? '',
  },
});
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME ?? '',
    acl: 'public-read',
    key(request, file, cb) {
      cb(null, `${Date.now().toString()} ${path.extname(file.originalname)}`);
    },
  }),
});

const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  const uploadSingleImage = upload.single('img');
  uploadSingleImage(req, res, (err) => {
    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE')
        return res
          .status(413)
          .json({ success: false, message: '이미지 용량 초과 (5MB 제한)' });

      return res
        .status(400)
        .json({ success: false, message: '이미지 저장 실패' });
    }
    return next();
  });
};

router.post(
  '/',
  authenticate(),
  uploadImage,
  async (
    req: CustomRequest,
    res: CustomResponse<{ user?: Omit<UserInterface, 'password'> }>,
  ) => {
    try {
      const { location } = req.file as Express.MulterS3.File;
      const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
          $set: {
            img: location,
          },
        },
        { new: true },
      ).lean<UserInterface>();
      const { password, ...rest } = user;
      res.json({ success: true, user: rest });
    } catch (err) {
      res.status(500).send({ success: false, message: '서버 에러' });
    }
  },
);

export default router;
