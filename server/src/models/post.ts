import { model, ObjectId, Schema, Types } from 'mongoose';

interface DBPost {
  writer: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  body: string;
  numId: number;
}

const postSchema = new Schema<DBPost>(
  {
    numId: {
      type: Number,
      default: 0,
    },
    writer: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Post = model<DBPost>('Post', postSchema);

export default Post;
