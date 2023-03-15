import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

import User, { PRIVATE_KEY } from '../models/user';

export interface IMiddleWareRequest extends Request {
  cookies: { refreshToken: string };
  accessToken?: string;
}

const authenticate = async (
  req: IMiddleWareRequest,
  res: Response,
  next: NextFunction,
) => {
  const response = () =>
    res.status(401).json({ success: false, message: '로그인 실패' });
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (accessToken) {
      jwt.verify(accessToken, `${PRIVATE_KEY}`);
      next();
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      try {
        const { _id } = <{ _id: ObjectId }>(
          jwt.verify(req.cookies.refreshToken, `${PRIVATE_KEY}`)
        );
        const user = await User.findById(_id);
        if (user?.refresh_token !== req.cookies.refreshToken) throw Error();
        const { accessToken } = await user.generateToken(true);
        req.accessToken = accessToken;
        next();
      } catch (error) {
        response();
      }
    }
    response();
  }
};
export default authenticate;
