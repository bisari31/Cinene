import axios from 'axios';

interface IResponse {
  success: boolean;
  likes?: number;
  message?: string;
  isLike?: boolean;
}

type IdType = 'contentId' | 'commentId';

export const getLikes = async (type: IdType, id?: string, userId?: string) => {
  try {
    if (!id) return;
    const { data } = await axios.get<IResponse>(
      `/like/${type}/${id}${userId ? `?userId=${userId}` : ''}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const upLike = async (obj: { type: IdType; id?: string }) => {
  if (!obj.id) return;
  const { data } = await axios.post<IResponse>(`/like/${obj.type}/${obj.id}`);
  return data;
};