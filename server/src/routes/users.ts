import { Response, Router } from 'express';
import bcrypt from 'bcrypt';

import User, { IUser } from '../models/user';
import { authenticate, IRequest } from './middleware';

const router = Router();
const SALT_ROUNDS = 12;

interface IRegisterBody {
  email: string;
  password: string;
  nickname: string;
}

interface IResponse {
  success: boolean;
  message?: string;
  code?: number;
  user?: IUser;
}

router.get(
  '/',
  authenticate,
  async (req: IRequest<null>, res: Response<IResponse>) => {
    try {
      res.json({ success: true, user: req.user });
    } catch (err) {
      res.status(400).send({ success: false, message: '인증 오류' });
    }
  },
);

router.post(
  '/register',
  async (req: IRequest<IRegisterBody>, res: Response<IResponse>) => {
    try {
      const hasEmail = await User.findOne({ email: req.body.email });
      const hasNickname = await User.findOne({
        nickname: req.body.nickname,
      });
      const getErrorCode = () => {
        let code = 0;
        if (hasNickname && hasEmail) code = 3;
        else if (hasEmail) code = 1;
        else if (hasNickname) code = 2;
        return code;
      };
      const errorCode = getErrorCode();
      if (errorCode) {
        return res.json({
          success: false,
          code: errorCode,
        });
      }
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const user = await User.create({
        email: req.body.email,
        nickname: req.body.nickname,
        password: hash,
      });

      res.json({ success: true, user });
    } catch (err) {
      res.status(400).send({ success: false, message: '서버 에러' });
    }
  },
);

router.post(
  '/login',
  async (req: IRequest<IRegisterBody>, res: Response<IResponse>) => {
    try {
      const user = await User.findPassword(
        req.body.email,
        req.body.password,
        true,
      );
      if (!user) {
        return res.json({
          success: false,
          message: '아이디 또는 비밀번호가 올바르지 않습니다.',
        });
      }
      if (!user.active)
        return res.json({
          success: false,
          message: '탈퇴한 유저입니다.',
          code: 1,
        });

      const newUser = await user.generateToken();
      res
        .cookie('auth', newUser.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        })
        .json({ success: true, user: newUser });
    } catch (err) {
      res.status(400).send({ success: false, message: '서버 에러' });
    }
  },
);

router.get(
  '/logout',
  authenticate,
  async (req: IRequest<null>, res: Response<IResponse>) => {
    try {
      await User.findByIdAndUpdate(req.user?._id, { $set: { token: '' } });
      res.clearCookie('auth').send({ success: true });
    } catch (err) {
      res.status(400).send({ success: false, message: '로그아웃 실패' });
    }
  },
);

router.post(
  '/check-password',
  authenticate,
  async (req: IRequest<{ password: string }>, res: Response<IResponse>) => {
    try {
      const user = await User.findPassword(req.user?._id, req.body.password);
      if (!user)
        return res.json({
          success: false,
          message: '비밀번호가 일치하지 않습니다.',
        });
      res.json({ success: true });
    } catch (err) {
      res.status(400).send({ success: false });
    }
  },
);

router.patch(
  '/change-password',
  authenticate,
  async (
    req: IRequest<{ password: string; nextPassword: string }>,
    res: Response<IResponse>,
  ) => {
    try {
      const user = await User.findPassword(req.user?._id, req.body.password);
      if (!user)
        return res.json({
          success: false,
          message: '비밀번호가 일치하지 않습니다.',
        });
      const hash = await bcrypt.hash(req.body.nextPassword, SALT_ROUNDS);
      const isChanged = await User.findByIdAndUpdate(req.user?._id, {
        $set: { password: hash },
      });
      if (!isChanged) throw Error();
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: '비밀번호 변경 실패' });
    }
  },
);

router.patch(
  '/change-nickname',
  authenticate,
  async (req: IRequest<{ nickname: string }>, res: Response<IResponse>) => {
    try {
      const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: { nickname: req.body.nickname },
      });
      if (!user) throw Error;
      res.json({ success: true, user });
    } catch (err) {
      res.json({ success: false, message: '닉네임이 이미 있습니다' });
    }
  },
);

router.delete(
  '/',
  authenticate,
  async (req: IRequest<null>, res: Response<IResponse>) => {
    try {
      await User.findByIdAndUpdate(req.user?._id, {
        $set: { active: false, token: '' },
      });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  },
);

export default router;
