import { Model, model, ObjectId, Schema, Types } from 'mongoose';

export interface IContent {
  _id?: ObjectId;
  type: string;
  name: string;
  poster: string;
  tmdbId: number;
  average: number;
  votes: number;
}

interface DBContentMethods {}
interface DBContentModel extends Model<IContent, {}, DBContentMethods> {
  increaseLikes(id: string): Promise<IContent>;
  decreaseLikes(id: string): Promise<IContent>;
}

const contentSchema = new Schema<IContent>({
  type: String,
  name: String,
  poster: String,
  tmdbId: Number,
  average: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

contentSchema.statics.increaseLikes = async function (id: string) {
  try {
    const content = await this.findOne({ _id: id });
    const newContent = await this.findOneAndUpdate(
      { _id: content._id },
      { likes: content.likes + 1 },
    );
    return newContent;
  } catch (err) {
    throw new Error('좋아요 증가 실패 ');
  }
};

contentSchema.statics.decreaseLikes = async function (id: string) {
  try {
    const content = await this.findOne({ _id: id });
    const newContent = await this.findOneAndUpdate(
      { _id: content._id },
      { likes: content.likes - 1 },
    );
    return newContent;
  } catch (err) {
    throw new Error('좋아요 감소 실패 ');
  }
};

const Content = model<IContent, DBContentModel>('Content', contentSchema);

export default Content;
