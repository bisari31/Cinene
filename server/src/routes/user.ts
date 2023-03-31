import { Router, Request } from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';

import { KakaoTokenData, KakaoUserData } from '../types/oauth';
import authenticate from '../utils/middleware';
import { CustomRequest, CustomResponse } from '../types/express';
import { UnauthorizedError } from '../utils/error';

import User, { UserInterface } from '../models/user';

const router = Router();
const SALT_ROUNDS = 10;
const KAKAO_HOST = 'https://kapi.kakao.com';

interface KakaoRequest extends Request {
  cookies: { kakao: string };
  body: { nickname: string; email: string };
}

router.get(
  '/',
  authenticate,
  async (
    req: CustomRequest<{ name: string }>,
    res: CustomResponse<{
      user?: Omit<UserInterface, 'password'> | null;
    }>,
  ) => {
    res.json({ success: true, accessToken: req.accessToken, user: req.user });
  },
);

router.post(
  '/register',
  async (
    req: Request<
      {},
      {},
      Pick<UserInterface, 'nickname' | 'email' | 'password'>
    >,
    res: CustomResponse<{ hasEmail?: boolean; hasNickname?: boolean }>,
  ) => {
    const { email, nickname, password } = req.body;
    try {
      const { hasEmail, hasNickname } = await User.checkDuplicateUserInfo(
        nickname,
        email,
      );
      if (hasEmail || hasNickname) {
        res.status(409).json({ success: false, hasEmail, hasNickname });
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await User.create({
          email: req.body.email,
          nickname: req.body.nickname,
          password: hashedPassword,
        });
        res.json({ success: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ success: false, message: err.message });
      }
    }
  },
);

router.post(
  '/login',
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: CustomResponse<{
      user?: Omit<UserInterface, 'password'>;
    }>,
  ) => {
    try {
      const { user } = await User.findUser(req.body.email, req.body.password);
      if (!user) throw new UnauthorizedError();
      const { accessToken, refreshToken } = await user.generateToken();
      const { password, ...userWithoutPassword } =
        user.toObject<UserInterface>();
      res
        .cookie('refreshToken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 14,
          httpOnly: true,
        })
        .json({
          success: true,
          accessToken,
          user: userWithoutPassword,
        });
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        res
          .status(err.statusCode)
          .json({ success: false, message: err.message });
      } else {
        res.status(500).json({ success: false, message: err.message });
      }
    }
  },
);

router.get(
  '/logout',
  authenticate,
  async (req: CustomRequest, res: CustomResponse) => {
    try {
      await User.findByIdAndUpdate(req.user?._id, {
        $set: { refresh_token: '' },
      });
      res.status(200).clearCookie('refreshToken').json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: '로그아웃 실패' });
    }
  },
);

router.patch(
  '/password',
  authenticate,
  async (
    req: CustomRequest<{}, {}, { password: string }>,
    res: CustomResponse,
  ) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      await User.updateOne(
        {
          _id: req.user?._id,
        },
        { $set: { password: hashedPassword } },
      );
      res.json({ success: true, accessToken: req.accessToken });
    } catch (err) {
      res.status(500).json({ success: false, message: '비밀번호 변경 실패' });
    }
  },
);

router.patch(
  '/nickname',
  authenticate,
  async (
    req: CustomRequest<{}, {}, { nickname: string }>,
    res: CustomResponse<{ user?: Omit<UserInterface, 'password'> }>,
  ) => {
    try {
      const { password, ...rest } = await User.findByIdAndUpdate(
        req.user?._id,
        {
          $set: { nickname: req.body.nickname },
        },
        { new: true },
      ).lean<UserInterface>();
      if (!rest) throw Error;
      res.json({ success: true, user: rest, accessToken: req.accessToken });
    } catch (err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        res
          .status(409)
          .json({ success: false, message: '닉네임이 이미 있습니다' });
      } else {
        res.status(500).json({ success: false, message: '서버 에러' });
      }
    }
  },
);

router.delete(
  '/',
  authenticate,
  async (req: CustomRequest, res: CustomResponse) => {
    try {
      await User.deleteOne({ email: req.user?.email });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: '회원 탈퇴 실패' });
    }
  },
);

router.get(
  '/kakao/:code',
  async (
    req: Request<{ code: string }>,
    res: CustomResponse<{
      user?:
        | Omit<UserInterface, 'password'>
        | Pick<UserInterface, 'email' | 'nickname'>;
    }>,
  ) => {
    try {
      const { data } = await axios.post<KakaoTokenData>(
        `https://kauth.kakao.com/oauth/token`,
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_REST_API_KEY,
            redirect_uri: 'http://localhost:3000/login',
            code: req.params.code,
          },
        },
      );
      const { data: userData } = await axios.get<KakaoUserData>(
        `${KAKAO_HOST}/v2/user/me`,
        {
          headers: { Authorization: `Bearer ${data.access_token}` },
        },
      );
      const user = await User.findOne({ email: `${userData.id}@kakao.com` });
      if (!user) {
        res
          .cookie('kakao', data.access_token, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
          })
          .json({
            success: true,
            user: {
              nickname: userData.properties?.nickname ?? '',
              email: `${userData.id}@kakao.com`,
            },
          });
        return;
      }
      const { accessToken, refreshToken } = await user.generateToken();
      const { password, ...userWithoutPassword } =
        user.toObject<UserInterface>();
      res
        .cookie('refreshToken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 14,
          httpOnly: true,
        })
        .json({
          success: true,
          accessToken,
          user: userWithoutPassword,
        });
    } catch (err) {
      res.status(500).json({ success: false, message: '카카오 인증 오류' });
    }
  },
);

router.post(
  '/kakao',
  async (req: KakaoRequest, res: CustomResponse<{ hasNickname?: boolean }>) => {
    try {
      if (!req.cookies.kakao) throw Error();
      const { data } = await axios.get<KakaoUserData>(
        `${KAKAO_HOST}/v2/user/me`,
        {
          headers: { Authorization: `Bearer ${req.cookies.kakao}` },
        },
      );
      const hasNickname = await User.findOne({
        nickname: req.body.nickname,
      });
      if (hasNickname) {
        res.status(409).json({ success: false, hasNickname: true });
      } else {
        await User.create({
          email: req.body.email,
          img: data.properties?.thumbnail_image,
          nickname: req.body.nickname,
          kakao_id: data.id,
        });
        res.json({ success: true });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: '카카오 인증 오류' });
    }
  },
);

router.delete(
  '/kakao/:id',
  authenticate,
  async (req: CustomRequest<{ id: string }>, res: CustomResponse) => {
    try {
      await axios.post(
        `${KAKAO_HOST}/v1/user/unlink`,
        {},
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
          },
          params: {
            target_id_type: 'user_id',
            target_id: req.params.id,
          },
        },
      );
      await User.deleteOne({ email: req.user?.email });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: '회원 탈퇴 실패' });
    }
  },
);

export default router;
