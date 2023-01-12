import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { IUser } from '../types/user';

export interface IRequest<T> extends Request {
  body: T;
  user?: IUser;
  cookies: { auth?: string };
}

export const authenticate = async (
  req: IRequest<any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findToken(req.cookies.auth);
    if (!user) return res.send({ success: false });
    req.user = user;
    next();
  } catch (err) {
    return res.send({ success: false, message: '로그인 실패' });
  }
};
