import { model, Schema, Model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const { PRIVATE_KEY } = process.env;

export interface UserInterface {
  email: string;
  password: string;
  nickname: string;
  img: string;
  refresh_token: string;
  kakao_id?: string;
}

export interface UserDocument extends UserInterface, Document {
  generateToken(isExpired?: boolean): Promise<{
    refreshToken?: string;
    accessToken: string;
  }>;
}

interface UserModel extends Model<UserDocument> {
  findToken(token: string | undefined): Promise<false | UserDocument>;
  findUser(
    email: string | undefined,
    password: string,
  ): Promise<{ success: boolean; user?: UserDocument }>;
  checkDuplicateUserInfo(
    nickname: string,
    email: string,
  ): Promise<{ hasEmail: boolean; hasNickname: boolean }>;
}

const userSchema = new Schema<UserInterface>(
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
    kakao_id: {
      type: String,
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
    expiresIn: '2h',
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
): Promise<false | UserInterface> {
  try {
    const id = jwt.verify(token, `${PRIVATE_KEY}`);
    const user: UserInterface = await this.findOne({ _id: id });
    if (!user) throw Error;
    return user;
  } catch (err) {
    return false;
  }
};

userSchema.statics.findUser = async function (
  email: string | undefined,
  password: string,
): Promise<{ success: boolean; user?: UserDocument }> {
  try {
    const user: UserDocument = await this.findOne({ email });
    if (!user) throw Error();
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw Error();
    return { success: true, user };
  } catch (err) {
    return { success: false };
  }
};

userSchema.statics.checkDuplicateUserInfo = async function (
  nickname: string,
  email: string,
) {
  const hasEmail = await this.findOne({ email });
  const hasNickname = await this.findOne({ nickname });

  return { hasEmail: !!hasEmail, hasNickname: !!hasNickname };
};

const User = model<UserDocument, UserModel>('User', userSchema);

export default User;
