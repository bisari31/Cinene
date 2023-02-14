import { model, ObjectId, Schema, Types } from 'mongoose';

export interface IReview {
  userId: ObjectId;
  contentId: ObjectId;
  contentType: string;
  comment: string;
  rating: number;
  params?: { contentId: string; contentType: string };
  isEditing: null | {
    _id: string;
  };
}

const reviewSchema = new Schema<IReview>(
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
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Rating = model<IReview>('Review', reviewSchema);
export default Rating;
