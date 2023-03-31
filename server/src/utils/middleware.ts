import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

import User, { UserInterface, PRIVATE_KEY } from '../models/user';

export interface MiddlewareRequest extends Request {
  cookies: { refreshToken: string };
  accessToken?: string;
  user?: Omit<UserInterface, 'password'> & { _id: ObjectId };
}

const authenticate = (autoLogin = false) => {
  return async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const response = () => {
      return res
        .status(autoLogin ? 200 : 401)
        .json({ success: false, message: '로그인 실패' });
    };
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];
      if (accessToken) {
        const { _id } = <{ _id: ObjectId }>(
          jwt.verify(accessToken, `${PRIVATE_KEY}`)
        );
        const { password, ...rest } = await User.findById(_id).lean<
          UserInterface & { _id: ObjectId }
        >();
        req.user = rest;
        next();
        return;
      }
      response();
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
          const { password, ...rest } = user.toObject<
            UserInterface & { _id: ObjectId }
          >();
          req.user = rest;
          next();
          return;
        } catch (error) {
          response();
        }
      }
      response();
    }
  };
};
export default authenticate;
