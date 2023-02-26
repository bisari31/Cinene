import axios from 'axios';

export const addRating = (obj: IAddReview) =>
  !obj.isEditing ? createReview(obj) : modifyReview(obj);

export const getReviews = async (
  contentId: string | undefined,
  contentType: string | undefined,
  userId?: string,
) => {
  if (!contentId || !contentType) return;
  const { data } = await axios.get<IReviewData>(
    `/reviews/${contentType}/${contentId}`,
    {
      params: { userId },
    },
  );

  return data;
};

const createReview = async (obj: IAddReview) => {
  const { data } = await axios.post<IReviewData>('/reviews', obj);
  return data;
};
const modifyReview = async (obj: IAddReview) => {
  const { data } = await axios.patch<IReviewData>(
    `/reviews/${obj.isEditing?._id}`,
    obj,
  );
  return data;
};
