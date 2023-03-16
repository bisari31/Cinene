import { Response, Router, Request } from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';

import { MongooseError, ObjectId } from 'mongoose';
import { KakaoTokenData, KakaoUserData } from '../types/oauth';
import authenticate, { MiddlewareRequest } from '../utils/middleware';

import User, { UserDocument, UserInterface } from '../models/user';
import { NotFoundError, UnauthorizedError } from '../utils/error';
import { CustomRequest, CustomResponse } from '../types/express';

const router = Router();
const SALT_ROUNDS = 10;

router.get(
  '/',
  authenticate,
  async (
    req: CustomRequest<{ name: string }>,
    res: CustomResponse<{
      accessToken?: string;
      user?: Omit<UserInterface, 'password'>;
    }>,
  ) => {
    try {
      res.json({ success: true, accessToken: req.accessToken, user: req.user });
    } catch (err) {
      if (err instanceof Error)
        res.status(500).json({ success: false, message: err.message });
    }
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
      accessToken?: string;
      user?: Omit<UserInterface, 'password'>;
    }>,
  ) => {
    try {
      const { user } = await User.findPassword(
        req.body.email,
        req.body.password,
      );
      if (!user) throw new UnauthorizedError();
      if (!user.active) throw new NotFoundError('탈퇴한 유저입니다.');
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
      } else if (err instanceof NotFoundError) {
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

// router.post(
//   '/check-password',
//   authenticate,
//   async (
//     req: CustomRequest<{ password: string }>,
//     res: Response<CustomResponse>,
//   ) => {
//     try {
//       const user = await User.findPassword(req.user?._id, req.body.password);
//       if (!user) {
//         res.json({
//           success: false,
//           message: '비밀번호가 일치하지 않습니다.',
//         });
//       } else res.json({ success: true });
//     } catch (err) {
//       res.status(400).send({ success: false });
//     }
//   },
// );

// router.patch(
//   '/password',
//   authenticate,
//   async (
//     req: CustomRequest<{ password: string; nextPassword: string }>,
//     res: Response<CustomResponse>,
//   ) => {
//     try {
//       const user = await User.findPassword(req.user?._id, req.body.password);
//       if (!user) {
//         res.json({
//           success: false,
//           message: '비밀번호가 일치하지 않습니다.',
//         });
//         return;
//       }
//       const hash = await bcrypt.hash(req.body.nextPassword, SALT_ROUNDS);
//       const isChanged = await User.findByIdAndUpdate(req.user?._id, {
//         $set: { password: hash },
//       });
//       if (!isChanged) throw Error();
//       res.json({ success: true });
//     } catch (err) {
//       res.status(400).json({ success: false, message: '비밀번호 변경 실패' });
//     }
//   },
// );

// router.patch(
//   '/nickname',
//   authenticate,
//   async (
//     req: CustomRequest<{ nickname: string }>,
//     res: Response<CustomResponse>,
//   ) => {
//     try {
//       const user = await User.findByIdAndUpdate(req.user?._id, {
//         $set: { nickname: req.body.nickname },
//       });
//       if (!user) throw Error;
//       res.json({ success: true, user });
//     } catch (err) {
//       res.json({ success: false, message: '닉네임이 이미 있습니다' });
//     }
//   },
// );

// router.delete(
//   '/',
//   authenticate,
//   async (req: CustomRequest<null>, res: Response<CustomResponse>) => {
//     try {
//       await User.findByIdAndUpdate(req.user?._id, {
//         $set: { active: false, token: '' },
//       });
//       res.json({ success: true });
//     } catch (err) {
//       res.status(400).json({ success: false });
//     }
//   },
// );

// router.get(
//   '/kakao-login/:code',
//   async (req, res: Response<CustomResponse>) => {
//     try {
//       const { data } = await axios.post<IKakaoTokenData>(
//         `https://kauth.kakao.com/oauth/token`,
//         null,
//         {
//           params: {
//             grant_type: 'authorization_code',
//             client_id: process.env.KAKAO_API_KEY,
//             redirect_uri: 'http://localhost:3000/login',
//             code: req.params.code,
//           },
//         },
//       );
//       const { data: userData } = await axios.get<IKakaoUserData>(
//         `https://kapi.kakao.com/v2/user/me`,
//         {
//           headers: { Authorization: `Bearer ${data.access_token}` },
//         },
//       );

//       const user = await User.findOne({ email: `${userData.id}@kakao` });
//       if (!user) {
//         res.cookie('kakao', data.access_token).json({
//           success: true,
//           info: {
//             nickname: userData.properties.nickname ?? '',
//             email: `${userData.id}@kakao`,
//           },
//         });
//         return;
//       }
//       const newUser = await user.generateToken();
//       res
//         .cookie('auth', newUser.token, {
//           expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
//         })
//         .json({ success: true, user: newUser });
//     } catch (err) {
//       res.status(400).json({ success: false, message: '카카오 인증 오류 ' });
//     }
//   },
// );

// router.post(
//   '/kakao-register',
//   async (
//     req: CustomRequest<{ nickname: string }>,
//     res: Response<CustomResponse>,
//   ) => {
//     try {
//       if (!req.cookies.kakao) throw Error();
//       const { data } = await axios.get<IKakaoUserData>(
//         `https://kapi.kakao.com/v2/user/me`,
//         {
//           headers: { Authorization: `Bearer ${req.cookies.kakao}` },
//         },
//       );
//       const { success, code } = await User.findUserInfo(req.body.nickname);
//       if (code) {
//         res.json({
//           success,
//           code,
//         });
//         return;
//       }
//       const user = await User.create({
//         email: `${data.id}@kakao`,
//         img: data.properties.profile_image ?? '',
//         nickname: req.body.nickname,
//       });
//       res.json({ success: true, user });
//     } catch (err) {
//       res.json({ success: false, message: 'kakao 인증 오류' });
//     }
//   },
// );

export default router;
