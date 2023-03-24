import { model, ObjectId, Schema, Types } from 'mongoose';

import { UserInterface } from './user';

export interface CommentInterface {
  comment: string;
  author: ObjectId | UserInterface;
  content: ObjectId;
  responseTo: ObjectId;
}

const commentSchema = new Schema<CommentInterface>(
  {
    author: {
      type: Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
    content: {
      type: Types.ObjectId,
    },
    responseTo: {
      type: Types.ObjectId,
    },
  },
  { timestamps: true },
);

const Comment = model('Comment', commentSchema);

export default Comment;
