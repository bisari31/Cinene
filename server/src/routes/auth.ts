import { Router } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import { authenticate, AuthRequest } from './middleware';

const saltRounds = 12;
const router = Router();

router.post('/create', async (req, res) => {
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
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('auth').json({ sucess: true });
});

router.get('/', authenticate, (req: AuthRequest, res) => {
  res.send({ isLoggedIn: true, user: req.user });
});

export default router;
