import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
    contentId: {
      type: Types.ObjectId,
      ref: 'Content',
    },
    responseTo: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Comment = model('Comment', commentSchema);

export default Comment;
