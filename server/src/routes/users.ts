import { Response, Router, Request } from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';

import User, { IUser } from '../models/user';
import { authenticate, IRequest } from './middleware';
import { IKakaoTokenData, IKakaoUserData } from '../types/users';

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
  info?: { nickname: string; email: string };
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
      const { success, code } = await User.findUserInfo(
        req.body.nickname,
        req.body.email,
      );
      if (code) {
        return res.json({
          success,
          code,
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
  '/password',
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
  '/nickname',
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

router.get('/kakao-login/:code', async (req, res: Response<IResponse>) => {
  try {
    const { data } = await axios.post<IKakaoTokenData>(
      `https://kauth.kakao.com/oauth/token`,
      null,
      {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_API_KEY,
          redirect_uri: 'http://localhost:3000/login',
          code: req.params.code,
        },
      },
    );
    const { data: userData } = await axios.get<IKakaoUserData>(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: { Authorization: `Bearer ${data.access_token}` },
      },
    );

    const user = await User.findOne({ email: `kakao@${userData.id}` });
    if (!user) {
      return res.cookie('kakao', data.access_token).json({
        success: true,
        info: {
          nickname: userData.properties.nickname ?? '',
          email: `kakao@${userData.id}`,
        },
      });
    }
    const newUser = await user.generateToken();
    res
      .cookie('auth', newUser.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      })
      .json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: '카카오 인증 오류 ' });
  }
});

router.post(
  '/kakao-register',
  async (req: IRequest<{ nickname: string }>, res: Response<IResponse>) => {
    try {
      if (!req.cookies.kakao) throw Error();
      const { data } = await axios.get<IKakaoUserData>(
        `https://kapi.kakao.com/v2/user/me`,
        {
          headers: { Authorization: `Bearer ${req.cookies.kakao}` },
        },
      );
      const { success, code } = await User.findUserInfo(req.body.nickname);
      if (code) {
        return res.json({
          success,
          code,
        });
      }
      const user = await User.create({
        email: `kakao@${data.id}`,
        img: data.properties.profile_image ?? '',
        nickname: req.body.nickname,
      });
      res.json({ success: true, user });
    } catch (err) {
      res.json({ success: false, message: 'kakao 인증 오류' });
    }
  },
);

export default router;
