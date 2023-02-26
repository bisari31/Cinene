interface IAddReview {
  comment: string;
  rating: number;
  contentType: string | undefined;
  contentId: string | undefined;
  isEditing: IReview | null;
}

interface IReviewData {
  success: boolean;
  message?: string;
  reviews?: IReview[];
  review?: IReview;
  hasReview?: IDocument | null;
}

interface IReview {
  contentId: string;
  contentType: string;
  createdAt: string;
  rating: number;
  comment: string;
  updatedAt: string;
  __v: number;
  _id: string;
  userId: IUser;
}
