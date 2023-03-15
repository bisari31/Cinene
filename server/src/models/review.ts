import { model, ObjectId, Schema, Types, Model, Document } from 'mongoose';

import Content, { IContent } from './content';
import { IUser } from './user';

export interface IReview {
  author: ObjectId | IUser;
  content: ObjectId | IContent;
  content_type: string;
  comment: string;
  rating: number;
}

interface IReviewDocument extends IReview, Document {}

interface IReviewModel extends Model<IReviewDocument> {
  updateRating: (
    contentId: Pick<IReview, 'content'>,
    contentType: Pick<IReview, 'content_type'>,
  ) => Promise<void>;
}

const reviewSchema = new Schema<IReview>(
  {
    author: {
      type: Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: Types.ObjectId,
      ref: 'Content',
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
  contentId: Pick<IReview, 'content'>,
  contentType: Pick<IReview, 'content_type'>,
) {
  try {
    const reviews: IReview[] = await this.find({ contentId, contentType });

    if (!reviews.length) {
      await Content.findOneAndUpdate(
        { _id: contentId },
        {
          $set: { average: 0, votes: 0 },
        },
      );
    } else {
      const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0);
      await Content.findOneAndUpdate(
        { _id: contentId },
        {
          $set: {
            average: totalRating / reviews.length,
            votes: reviews.length,
          },
        },
      );
    }
  } catch (err) {
    const error = { success: false, message: '평점 업데이트 에러 발생' };
    throw error;
  }
};

const Rating = model<IReviewDocument, IReviewModel>('Review', reviewSchema);
export default Rating;
