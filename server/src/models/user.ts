import { model, Schema, Model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  password: string;
  nickname: string;
  img: string;
  refresh_token?: string;
  createdAt: Date;
  active: boolean;
}

interface IUserDocument extends IUser, Document {
  generateToken(isExpired?: boolean): Promise<{
    refreshToken?: string;
    accessToken: string;
  }>;
}

interface IUserModel extends Model<IUserDocument> {
  findToken(token: string | undefined): Promise<false | IUserDocument>;
  findPassword(
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: IUserDocument }>;
  checkDuplicateUserInfo(
    nickname: string,
    email: string,
  ): Promise<{ hasEmail: boolean; hasNickname: boolean }>;
}

export const { PRIVATE_KEY } = process.env;

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    nickname: {
      type: String,
      unique: true,
    },
    img: {
      type: String,
      default: '',
    },
    refresh_token: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateToken = async function (isExpired = false): Promise<{
  refreshToken?: string;
  accessToken: string;
}> {
  const accessToken = jwt.sign({ _id: this._id }, `${PRIVATE_KEY}`, {
    expiresIn: '1 h',
  });
  if (isExpired) return { accessToken };
  const refreshToken = jwt.sign({ _id: this._id }, `${PRIVATE_KEY}`, {
    expiresIn: '14 days',
  });
  this.refresh_token = refreshToken;
  await this.save();
  return { refreshToken, accessToken };
};

userSchema.statics.findToken = async function (
  token: string,
): Promise<false | IUser> {
  try {
    const id = jwt.verify(token, `${PRIVATE_KEY}`);
    const user: IUser = await this.findOne({ _id: id });
    if (!user) throw Error;
    return user;
  } catch (err) {
    return false;
  }
};

userSchema.statics.findPassword = async function (
  email: string,
  password: string,
): Promise<{ success: boolean; user?: IUserDocument }> {
  try {
    const user: IUserDocument = await this.findOne({ email });
    if (!user) throw Error();
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw Error();
    return { success: true, user };
  } catch (err) {
    return { success: false };
  }
};
// userSchema.statics.findPassword = async function (
//   id: string | ObjectId | undefined,
//   password: string,
//   isLogin?: boolean,
// ): Promise<false | IUser> {
//   try {
//     const _id = isLogin ? 'email' : '_id';
//     const user: IUser = await this.findOne({ [_id]: id });
//     const comparePassword = await bcrypt.compare(password, user.password);
//     if (!user || !comparePassword) return false;
//     return user;
//   } catch (err) {
//     return false;
//   }
// };

userSchema.statics.checkDuplicateUserInfo = async function (
  nickname: string,
  email: string,
) {
  const hasEmail = await this.findOne({ email });
  const hasNickname = await this.findOne({ nickname });

  return { hasEmail: !!hasEmail, hasNickname: !!hasNickname };
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
