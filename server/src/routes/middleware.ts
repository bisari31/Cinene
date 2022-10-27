import { Response, Request, NextFunction } from 'express';
import User, { DBUser } from '../models/user';

export interface AuthRequest extends Request {
  user?: DBUser;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  User.findByToken(req.cookies.auth, (err, user) => {
    if (err) return res.status(200).send({ isLoggedIn: false });
    req.user = user;
    next();
  });
};
