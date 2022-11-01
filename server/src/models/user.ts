import { Schema, model, Model, ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface DBUser {
  _id: ObjectId;
  email: string;
  password: string;
  nickname: string;
  token: string;
  createdAt: Date;
}

interface DBUserMethods {
  generateToken(): Promise<DBUser>;
}
interface DBUserModel extends Model<DBUser, {}, DBUserMethods> {
  findByToken(
    token: string,
    cb: (err: true | null, user: DBUser) => void,
  ): void;
}

const PRIVATE_KEY = process.env.PRIVATE_KEY!;

const userSchema = new Schema<DBUser>(
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
    token: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(this._id.toString(), `${PRIVATE_KEY}`);
    this.token = token;
    const user = await this.save();
    return user;
  } catch (err) {
    console.log(err);
  }
};

userSchema.statics.findByToken = async function (token: string, cb) {
  try {
    const id = jwt.verify(token, `${PRIVATE_KEY}`);
    const user = await this.findOne({ _id: id, token });
    if (!user) return cb(true);
    cb(null, user);
  } catch (err) {
    cb(true);
  }
};

const User = model<DBUser, DBUserModel>('User', userSchema);

export default User;
