import axios from 'axios';

import { bearer, getAccessToken } from './user';

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
  accessToken?: string;
}

export const handleReview = async (obj: Body) =>
  obj.hasReview ? updateReveiw(obj) : createReview(obj);

export const getReviews = async (
  contentId: string | undefined,
  contentType: string | undefined,
  userId?: string,
) => {
  if (!contentId || !contentType) return null;
  const { data } = await axios.get<ReviewData>(
    `/api/reviews/${contentType}/${contentId}`,
    { params: { userId } },
  );

  return data;
};

export const deleteReview = async (id: string) => {
  const { data } = await axios.delete<CustomResponse>(
    `/api/reviews/${id}`,
    bearer(),
  );
  getAccessToken(data);
  return data;
};

const createReview = async (obj: Body) => {
  const { data } = await axios.post<CustomResponse>(
    `/api/reviews`,
    obj,
    bearer(),
  );
  getAccessToken(data);
  return data;
};
const updateReveiw = async (obj: Body) => {
  const { data } = await axios.patch<ReviewData>(
    `/api/reviews/${obj.hasReview}`,
    obj,
    bearer(),
  );
  getAccessToken(data);
  return data;
};
