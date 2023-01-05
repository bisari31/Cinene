import { model, Schema, Types } from 'mongoose';

const ratingSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    contentId: {
      type: Types.ObjectId,
      ref: 'Content',
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

const Rating = model('Rating', ratingSchema);
export default Rating;
