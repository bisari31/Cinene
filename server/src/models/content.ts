import { Model, model, Schema, Document } from 'mongoose';

export interface IContent {
  content_type: string;
  title: string;
  poster_url: string;
  tmdbId: number;
  average: number;
  votes: number;
}

interface IContentDocument extends IContent, Document {}
interface IContentModel extends Model<IContentDocument> {
  increaseLikes(id: string): Promise<IContent>;
  decreaseLikes(id: string): Promise<IContent>;
}

const contentSchema = new Schema<IContent>({
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

const Content = model<IContentDocument, IContentModel>(
  'Content',
  contentSchema,
);

export default Content;
