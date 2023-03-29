import axios from 'axios';

import { SERVER_HOST } from 'utils/api';
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
    `${SERVER_HOST}/reviews/${contentType}/${contentId}`,
    { params: { userId } },
  );

  return data;
};

export const deleteReview = async (id: string) => {
  const { data } = await axios.delete<CustomResponse>(
    `${SERVER_HOST}/reviews/${id}`,
    bearer(),
  );
  getAccessToken(data);
  return data;
};

const createReview = async (obj: Body) => {
  const { data } = await axios.post<CustomResponse>(
    `${SERVER_HOST}/reviews`,
    obj,
    bearer(),
  );
  getAccessToken(data);
  return data;
};
const updateReveiw = async (obj: Body) => {
  const { data } = await axios.patch<ReviewData>(
    `${SERVER_HOST}/reviews/${obj.hasReview}`,
    obj,
    bearer(),
  );
  getAccessToken(data);
  return data;
};
