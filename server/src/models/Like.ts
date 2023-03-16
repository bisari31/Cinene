import { Schema, Types, model, ObjectId } from 'mongoose';

import { CommentInterface } from './comment';
import { ContentInterface } from './content';

interface LikeInterface {
  _id: ObjectId;
  content: ObjectId | ContentInterface;
  comment: ObjectId | CommentInterface;
  liked_by: ObjectId;
}

const likeSchema = new Schema<Omit<LikeInterface, '_id'>>({
  content: {
    type: Types.ObjectId,
    ref: 'Content',
  },
  comment: {
    type: Types.ObjectId,
    ref: 'Comment',
  },
  liked_by: {
    type: Types.ObjectId,
  },
});

const Like = model('Like', likeSchema);

export default Like;
