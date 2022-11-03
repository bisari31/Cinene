import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema(
  {
    writer: {
      type: Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
    },
    responseTo: {
      type: Types.ObjectId,
    },
  },
  { timestamps: true },
);

const Comment = model('Comment', commentSchema);

export default Comment;
