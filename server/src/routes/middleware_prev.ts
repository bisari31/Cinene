// import bcrypt from 'bcrypt';
import { Response, Request, NextFunction } from 'express';

import User, { DBUser } from '../models/user_prev';

export interface AuthRequest extends Request {
  user?: DBUser;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  User.findByToken(req.cookies.auth, (err, user) => {
    if (err) return res.status(200).send({ success: false });
    req.user = user;
    next();
  });
};

// export const comparePassword = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const result = bcrypt.compare(
//     req.body.password,
//     req.user?.password as string,
//   );
//   if (!result) {
//     return res
//       .status(400)
//       .send({ success: false, message: '비밀번호가 일치하지 않습니다.' });
//   }
//   next();
// };
