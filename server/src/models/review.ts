import { model, ObjectId, Schema, Types, Model } from 'mongoose';

import Content from './content';

export interface IReview {
  _id: ObjectId;
  userId: ObjectId;
  contentId: ObjectId;
  contentType: string;
  comment: string;
  rating: number;
}

export interface ReviewModel extends Model<IReview> {
  updateRatings: (contentId: any, contentType: any) => Promise<void>;
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

reviewSchema.statics.updateRatings = async function (
  contentId: Pick<IReview, 'contentId'>,
  contentType: Pick<IReview, 'contentType'>,
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
      const totalRating = reviews.reduce((acc, cur) => (acc += cur.rating), 0);
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
    throw { success: false, message: '평점 업데이트 에러 발생' };
  }
};

const Rating = model<IReview, ReviewModel>('Review', reviewSchema);
export default Rating;
