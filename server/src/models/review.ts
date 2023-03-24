import { model, ObjectId, Schema, Types, Model, Document } from 'mongoose';

import Content from './content';
import { UserInterface } from './user';

export interface ReviewInterface {
  author: ObjectId | UserInterface;
  content: ObjectId;
  content_type: string;
  comment: string;
  rating: number;
}

interface ReviewDocument extends ReviewInterface, Document {}

interface ReviewModel extends Model<ReviewDocument> {
  updateRating: (contentId: ObjectId, contentType: string) => Promise<void>;
}

const reviewSchema = new Schema<ReviewInterface>(
  {
    author: {
      type: Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: Types.ObjectId,
    },
    content_type: {
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

reviewSchema.statics.updateRating = async function (
  contentId: ObjectId,
  contentType: string,
) {
  try {
    const reviews: ReviewInterface[] = await this.find({
      content: contentId,
      content_type: contentType,
    });

    if (!reviews.length) {
      await Content.findByIdAndUpdate(contentId, {
        $set: { average: 0, votes: 0 },
      });
    } else {
      const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0);
      await Content.findByIdAndUpdate(contentId, {
        $set: {
          average: totalRating / reviews.length,
          votes: reviews.length,
        },
      });
    }
  } catch (err) {
    const error = { success: false, message: '평점 업데이트 에러 발생' };
    throw error;
  }
};

const Rating = model<ReviewDocument, ReviewModel>('ReviewSchema', reviewSchema);
export default Rating;
