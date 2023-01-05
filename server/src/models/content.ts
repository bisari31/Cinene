import { model, Schema, Types } from 'mongoose';
import { IContent } from '../types/content';

const contentSchema = new Schema<IContent>({
  type: String,
  name: String,
  poster: String,
  tmdbId: Number,
  average: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Content = model<IContent>('Content', contentSchema);

export default Content;
