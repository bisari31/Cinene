import { Schema, Types, model } from 'mongoose';

const likeSchema = new Schema(
  {
    contentId: {
      type: Types.ObjectId,
      ref: 'Content',
    },
    commentId: {
      type: Types.ObjectId,
      ref: 'Content',
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
);

const Like = model('Like', likeSchema);

export default Like;
