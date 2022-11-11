import { Response, Request, NextFunction } from 'express';
import User, { DBUser } from '../models/user';
import bcrypt from 'bcrypt';
export interface AuthRequest extends Request {
  user?: DBUser;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  User.findByToken(req.cookies.auth, (err, user) => {
    if (err)
      return res
        .status(200)
        .send({ isLoggedIn: false, message: '로그인 하세요' });
    req.user = user;
    next();
  });
};

// export const comparePassword = async (
//   req: CompareRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const user = await User.findOne({ _id: req.body._id });
//     if (user) {
//       const result = await bcrypt.compare(req.body.password, user?.password);
//       if (!result)
//         return res
//           .status(400)
//           .send({ success: false, message: '비밀번호가 일치하지 않습니다.' });

//       req.user = user;
//       next();
//     } else {
//       res
//         .status(400)
//         .send({ success: false, message: '아이디가 일치하지 않습니다.' });
//     }
//   } catch (err) {
//     res.status(400).send({ success: false, message: '에러 발생 ' });
//   }
// };
