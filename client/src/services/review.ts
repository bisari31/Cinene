import axios from 'axios';

export const addRating = (obj: AddReview) =>
  !obj.isEditing ? createReview(obj) : modifyReview(obj);

export const getReviews = async (
  contentId: string | undefined,
  contentType: string | undefined,
  userId?: string,
) => {
  if (!contentId || !contentType) return null;
  const { data } = await axios.get<ReviewData>(
    `/reviews/${contentType}/${contentId}`,
    {
      params: { userId },
    },
  );

  return data;
};

export const deleteReview = async (id: string) => {
  const { data } = await axios.delete<ReviewData>(`/reviews/${id}`);
  return data;
};

const createReview = async (obj: AddReview) => {
  const { data } = await axios.post<ReviewData>('/reviews', obj);
  return data;
};
const modifyReview = async (obj: AddReview) => {
  const { data } = await axios.patch<ReviewData>(
    `/reviews/${obj.isEditing?._id}`,
    obj,
  );
  return data;
};
