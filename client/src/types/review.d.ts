interface IAddReview {
  comment: string;
  rating: number;
  contentType: string | undefined;
  contentId: string | undefined;
  isEditing: IDocument | null;
}

interface IReviewData {
  success: boolean;
  message?: string;
  documents: IDocument[];
  hasReview: IDocument | null;
}

interface IDocument {
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
