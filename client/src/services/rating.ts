import axios from 'axios';

export const addRating = async (obj: IAddReview) => {
  try {
    if (!obj.review || !obj.rating) return;
    const { data } = await axios.post('/rating', obj);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getReviews = async (
  contentId: string | undefined,
  contentType: string | undefined,
  userId?: string,
) => {
  if (!contentId || !contentType) return;
  console.log(userId);
  const { data } = await axios.get<IReviewData>(
    `/rating/${contentType}/${contentId}`,
    {
      params: { userId },
    },
  );

  return data;
};
