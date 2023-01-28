import { Schema, Types, model } from 'mongoose';

const likeSchema = new Schema({
  contentId: {
    type: Types.ObjectId,
    ref: 'Content',
  },
  commentId: {
    type: Types.ObjectId,
    ref: 'Comment',
  },
  userId: {
    type: Types.ObjectId,
  },
});

const Like = model('Like', likeSchema);

export default Like;
