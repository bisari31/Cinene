import { Router } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import { authenticate, AuthRequest } from './middleware';

interface UserDeleteAuthRequest extends AuthRequest {
  body: { password: string };
}

const saltRounds = 12;
const router = Router();

router.post('/register', async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    const checkNickname = await User.findOne({ nickname: req.body.nickname });
    if (checkEmail) {
      return res
        .status(400)
        .json({ success: false, message: '중복된 아이디 입니다.' });
    }
    if (checkNickname) {
      return res
        .status(400)
        .json({ success: false, message: '중복된 닉네임 입니다.' });
    }
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    });
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const newUser = await user.generateToken();
        return res
          .cookie('auth', newUser.token)
          .json({ success: true, user: newUser });
      }
      return res
        .status(400)
        .send({ success: false, message: '비밀번호가 일치하지 않습니다.' });
    }
    res.status(400).send({ success: false, message: '아이디가 없습니다.' });
  } catch (err) {
    res.status(400).send({ success: false, message: '서버 에러' });
  }
});

router.get('/logout', authenticate, async (req: AuthRequest, res) => {
  await User.findByIdAndUpdate({ _id: req.user?._id }, { token: '' });
  res.clearCookie('auth').json({ sucess: true });
});

router.get('/', authenticate, (req: AuthRequest, res) => {
  res.send({ isLoggedIn: true, user: req.user });
});

router.post(
  '/checkPassword',
  authenticate,
  async (req: UserDeleteAuthRequest, res) => {
    try {
      if (req.user) {
        const result = await bcrypt.compare(
          req.body.password,
          req.user?.password,
        );
        return res.json(result);
      }
    } catch (err) {
      console.log(err);
    }
  },
);
router.delete('/deleteUser', authenticate, async (req: AuthRequest, res) => {
  try {
    await User.deleteOne({ _id: req.user?._id });
    res
      .clearCookie('auth')
      .status(200)
      .json({ success: true, message: '유저 정보를 삭제하였습니다.' });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: '유저 정보를 삭제하지 못했습니다.' });
  }
});

router.put('/updateUser', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findOne({ _id: req.user?._id });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const newUser = await User.updateOne(
          { _id: req.body.id },
          { nickname: req.body.nickname },
        );
        console.log(newUser);
        //   if (newUser) return res.send({ success: true, user: newUser });
        //   return res.status(400).send({
        //     success: false,
        //     message: '닉네임이 이미 있습니다.',
        //   });
      }
      // res
      //   .status(400)
      //   .send({ success: false, message: '비밀번호가 일치하지 않습니다.' });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: '서버 에러' });
  }
});

export default router;
