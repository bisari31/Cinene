import { model, Schema } from 'mongoose';

export interface ContentInterface {
  content_type: string;
  title: string;
  poster_url: string;
  tmdbId: number;
  average: number;
  votes: number;
}

const contentSchema = new Schema<ContentInterface>({
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

const Content = model('Content', contentSchema);

export default Content;
