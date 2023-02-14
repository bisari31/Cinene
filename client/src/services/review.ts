import axios from 'axios';

export const addRating = (obj: IAddReview) =>
  !obj.isEditing ? createReview(obj) : modifyReview(obj);

export const getReviews = async (
  contentId: string | undefined,
  contentType: string | undefined,
  userId?: string,
) => {
  if (!contentId || !contentType) return;
  console.log(userId);
  const { data } = await axios.get<IReviewData>(
    `/reviews/${contentType}/${contentId}`,
    {
      params: { userId },
    },
  );

  return data;
};

const createReview = async (obj: IAddReview) => {
  try {
    const { data } = await axios.post('/reviews', obj);
    return data;
  } catch (err) {
    console.log(err);
  }
};
const modifyReview = async (obj: IAddReview) => {
  try {
    const { data } = await axios.patch(`/reviews/${obj.isEditing?._id}`, obj);
    return data;
  } catch (err) {
    console.log(err);
  }
};
