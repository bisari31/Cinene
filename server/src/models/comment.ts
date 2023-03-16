import { model, ObjectId, Schema, Types } from 'mongoose';

import { ContentInterface } from './content';
import { UserInterface } from './user';

export interface CommentInterface {
  _id: ObjectId;
  comment: string;
  author: ObjectId | UserInterface;
  content: ObjectId | ContentInterface;
  parent_comment_author: ObjectId | UserInterface;
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
