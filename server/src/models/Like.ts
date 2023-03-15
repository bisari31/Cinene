import { Schema, Types, model, ObjectId } from 'mongoose';

import { IComment } from './comment';
import { IContent } from './content';

interface ILikes {
  content: ObjectId | IContent;
  comment: ObjectId | IComment;
  liked_by: ObjectId;
}

const likeSchema = new Schema<ILikes>({
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
