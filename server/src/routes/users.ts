import { Response, Router } from 'express';
import bcrypt from 'bcrypt';

import User, { IUser } from '../models/user';
import { authenticate, IRequest } from './middleware';
import { json } from 'stream/consumers';

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
  type?: 'nickname' | 'email' | 'login';
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
      const checkedEmail = await User.findOne({ email: req.body.email });
      if (checkedEmail) {
        return res.json({
          success: false,
          message: '이미 가입된 이메일이 있습니다.',
          type: 'email',
        });
      }
      const checkedNickname = await User.findOne({
        nickname: req.body.nickname,
      });
      if (checkedNickname || checkedEmail) {
        return res.json({
          success: false,
          message: '이미 가입된 닉네임이 있습니다.',
          type: 'nickname',
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
          type: 'login',
        });
      }
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
      await User.findByIdAndUpdate({ _id: req.user?._id }, { token: '' });
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
      const isChanged = await User.findOneAndUpdate(
        { _id: req.user?._id },
        { $set: { password: hash } },
      );
      if (!isChanged) throw Error();
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: '비밀번호 변경 실패' });
    }
  },
);

router.delete(
  '/',
  authenticate,
  async (req: IRequest<null>, res: Response<IResponse>) => {
    try {
      await User.deleteOne({ _id: req.user?._id });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  },
);

export default router;
