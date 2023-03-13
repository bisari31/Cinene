import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';

export interface IRequest<T> extends Request {
  body: T;
  user?: IUser;
  cookies: { auth?: string; kakao?: string };
}

export const authenticate = async (
  req: IRequest<any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findToken(req.cookies.auth);
    if (!user) {
      res.send({ success: false });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.send({ success: false, message: '로그인 실패' });
  }
};
