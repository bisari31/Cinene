import { Model, model, Schema, Document, ObjectId } from 'mongoose';

export interface ContentInterface {
  _id: ObjectId;
  content_type: string;
  title: string;
  poster_url: string;
  tmdbId: number;
  average: number;
  votes: number;
}

interface ContentDocument extends Omit<ContentInterface, '_id'>, Document {}
interface ContentModel extends Model<ContentDocument> {
  increaseLikes(id: string): Promise<ContentInterface>;
  decreaseLikes(id: string): Promise<ContentInterface>;
}

const contentSchema = new Schema<Omit<ContentInterface, '_id'>>({
  content_type: {
    type: String,
  },
  title: { type: String },
  poster_url: { type: String },
  tmdbId: { type: Number },
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

const Content = model<ContentDocument, ContentModel>('Content', contentSchema);

export default Content;
