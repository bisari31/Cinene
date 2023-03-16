interface AddReview {
  comment: string;
  rating: number;
  contentType: string | undefined;
  contentId: string | undefined;
  isEditing: Review | null;
}

interface ReviewData {
  success: boolean;
  message?: string;
  reviews?: Review[];
  review?: Review;
  hasReview?: Review | null;
}

interface Review {
  contentId: string;
  contentType: string;
  createdAt: string;
  rating: number;
  comment: string;
  updatedAt: string;
  __v: number;
  _id: string;
  userId: User;
}
