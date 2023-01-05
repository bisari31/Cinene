import { Request, Router } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import { authenticate, IRequest } from './middleware';

const router = Router();
const SALT_ROUNDS = 12;

interface IRegisterBody {
  email: string;
  password: string;
  nickname: string;
}

router.get('/', authenticate, async (req: IRequest<null>, res) => {
  try {
    res.json({ success: true });
  } catch (err) {
    res.status(400).send({ success: false, message: '인증 오류' });
  }
});

router.post('/register', async (req: IRequest<IRegisterBody>, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    const checkName = await User.findOne({ nickname: req.body.nickname });

    if (checkEmail) {
      throw { type: 'email', message: '이미 가입된 이메일이 있습니다.' };
    }
    if (checkName) {
      throw { type: 'name', message: '이미 가입된 닉네임이 있습니다.' };
    }

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hash,
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).send({ success: false, ...err });
  }
});

router.post('/login', async (req: IRequest<IRegisterBody>, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw { type: 'email', message: '아이디가 올바르지 않습니다.' };
    const password = await bcrypt.compare(req.body.password, user.password!);
    if (!password)
      throw { type: 'password', message: '비밀번호가 올바르지 않습니다.' };

    const newUser = await user.generateToken();
    res
      .cookie('auth', newUser.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
      })
      .json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).send({ success: false, ...err });
  }
});

router.get('/logout', authenticate, async (req: IRequest<null>, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.user?._id }, { token: '' });
    res.clearCookie('auth').send({ success: true });
  } catch (err) {
    res.status(400).send({ success: false, message: '로그아웃 실패' });
  }
});

export default router;
