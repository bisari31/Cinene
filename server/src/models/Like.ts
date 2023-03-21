import { Schema, Types, model, ObjectId } from 'mongoose';
import { ContentInterface } from './content';

export interface LikeInterface {
  _id: ObjectId;
  content: ObjectId | ContentInterface;
  comment: ObjectId;
  liked_by: ObjectId;
}

const likeSchema = new Schema<Omit<LikeInterface, '_id'>>({
  content: {
    type: Types.ObjectId,
    ref: 'Content',
  },
  comment: {
    type: Types.ObjectId,
  },
  liked_by: {
    type: Types.ObjectId,
  },
});

const Like = model('Like', likeSchema);

export default Like;
