import { model, Schema, Model, ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  nickname: string;
  img: string;
  token?: string;
  createdAt: Date;
  active: boolean;
}

interface IUserDocument extends IUser, Document {
  generateToken(): Promise<IUser>;
}

export interface UserMethods {
  generateToken(): Promise<IUser>;
}

export interface UserModel extends Model<IUser, {}, UserMethods> {
  findToken(token: string | undefined): Promise<false | IUserDocument>;
  findPassword(
    id: string | ObjectId | undefined,
    password: string,
    isLogin?: boolean,
  ): Promise<false | IUserDocument>;
}

const PRIVATE_KEY = process.env.PRIVATE_KEY!;

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
      default: 'default.jpg',
    },
    token: {
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

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(this._id.toString(), `${PRIVATE_KEY}`);
    this.token = token;
    const user: IUser = await this.save();
    return user;
  } catch (err) {
    console.log(err);
  }
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
  id: string | ObjectId | undefined,
  password: string,
  isLogin?: boolean,
): Promise<false | IUser> {
  try {
    const _id = isLogin ? 'email' : '_id';
    const user: IUser = await this.findOne({ [_id]: id });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!user || !comparePassword) return false;
    return user;
  } catch (err) {
    return false;
  }
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
