import axios from 'axios';

interface IResponse {
  success: boolean;
  likes?: number;
  message?: string;
  isLike?: boolean;
}

type IdType = 'contentId' | 'commentId';

export const getLikes = async (type: IdType, id?: string, userId?: string) => {
  if (!id) return;
  const { data } = await axios.get<IResponse>(
    `/likes/${type}/${id}${userId ? `?userId=${userId}` : ''}`,
  );
  return data;
};

export const like = async (obj: { type: IdType; id?: string }) => {
  if (!obj.id) return;
  const { data } = await axios.post<IResponse>(`/likes/${obj.type}/${obj.id}`);
  return data;
};

export const getFavorites = async () => {
  const { data } = await axios.get<IFavoritesData>(`/likes/favorites`);
  return data;
};
