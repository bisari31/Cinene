import { model, ObjectId, Schema, Types } from 'mongoose';

import { IContent } from './content';
import { IUser } from './user';

export interface IComment {
  comment: string;
  author: ObjectId | IUser;
  content: ObjectId | IContent;
  parent_comment_author: ObjectId | IUser;
}

const commentSchema = new Schema<IComment>(
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
      ref: 'Content',
    },
    parent_comment_author: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Comment = model('Comment', commentSchema);

export default Comment;
