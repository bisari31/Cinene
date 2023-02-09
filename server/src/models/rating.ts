import { model, ObjectId, Schema, Types } from 'mongoose';

export interface IRating {
  userId: ObjectId;
  contentId: ObjectId;
  contentType: string;
  review: string;
  rating: number;
  params?: { contentId: string; contentType: string };
  isEditing: null | {
    _id: string;
  };
}

const ratingSchema = new Schema<IRating>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    contentId: {
      type: Types.ObjectId,
      ref: 'Content',
    },
    contentType: {
      type: String,
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;
