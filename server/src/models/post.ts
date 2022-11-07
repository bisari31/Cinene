import { Model, model, ObjectId, Schema, Types } from 'mongoose';

interface DBPost {
  writer: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  body: string;
  numId: number;
  commentsNum: number;
}

interface DBPostMethods {
  addCountComments(): Promise<DBPost>;
}
interface DBPostModel extends Model<DBPost, {}, DBPostMethods> {}

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
  this.commentsNum += 1;
  return await this.save();
};

const Post = model<DBPost, DBPostModel>('Post', postSchema);

export default Post;
