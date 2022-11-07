import { Model, model, ObjectId, Schema, Types } from 'mongoose';

interface DBPost {
  writer: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  body: string;
  seq: number;
  commentsNum: number;
}

interface DBPostMethods {
  addCountComments(): Promise<DBPost>;
  addCountViews(): any;
}
interface DBPostModel extends Model<DBPost, {}, DBPostMethods> {}

const postSchema = new Schema<DBPost>(
  {
    seq: {
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
    commentsNum: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.methods.addCountComments = async function () {
  try {
    this.commentsNum += 1;
    const post = await this.save();
    return post;
  } catch (err) {
    throw new Error('댓글 증가 실패');
  }
};

postSchema.methods.addCountViews = async function () {
  try {
    this.views += 1;
    const post = await this.save();
    return post;
  } catch (err) {
    throw new Error('조회수 증가 실패');
  }
};

const Post = model<DBPost, DBPostModel>('Post', postSchema);

export default Post;
