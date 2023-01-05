import { Request } from 'express';
import { Model, ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  nickname: string;
  img: string;
  token?: string;
  createdAt: Date;
}

export interface UserMethods {
  generateToken(): Promise<IUser>;
}

export interface UserModel extends Model<IUser, {}, UserMethods> {
  findToken(token: string | undefined): Promise<false | IUser>;
}
