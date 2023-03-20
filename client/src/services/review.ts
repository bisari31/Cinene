import axios from 'axios';
import { bearer } from './user';

interface Body {
  comment: string;
  rating: number;
  hasReview?: string | null;
  content_type?: string;
  content?: string;
}

interface ReviewData {
  reviews?: Review[];
  review?: Review;
  hasReview?: Review | null;
}

export const addReview = async (obj: Body) =>
  obj.hasReview ? modifyReview(obj) : createReview(obj);

export const getReviews = async (
  contentId: string | undefined,
  contentType: string | undefined,
  userId?: string,
) => {
  if (!contentId || !contentType) return null;
  const { data } = await axios.get<ReviewData>(
    `/reviews/${contentType}/${contentId}`,
    { params: { userId } },
  );

  return data;
};

export const deleteReview = async (id: string) => {
  const { data } = await axios.delete<CustomResponse>(
    `/reviews/${id}`,
    bearer(),
  );
  return data;
};

const createReview = async (obj: Body) => {
  const { data } = await axios.post<CustomResponse>('/reviews', obj, bearer());
  return data;
};
const modifyReview = async (obj: Body) => {
  const { data } = await axios.patch<ReviewData>(
    `/reviews/${obj.hasReview}`,
    obj,
    bearer(),
  );
  return data;
};
