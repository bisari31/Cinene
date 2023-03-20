import axios from 'axios';
import { bearer } from './user';

interface IResponse {
  success: boolean;
  likes?: number;
  message?: string;
  isLike?: boolean;
}

type Type = 'contentId' | 'commentId';

export const getLikes = async (type: Type, id?: string, userId?: string) => {
  if (!id) return null;
  const { data } = await axios.get<IResponse>(`/likes/${type}/${id}`, {
    params: { userId },
  });
  return data;
};

export const like = async (type: Type, id?: string) => {
  if (id) return null;
  const { data } = await axios.post<IResponse>(
    `/likes/${type}/${id}`,
    bearer(),
  );
  return data;
};

export const getFavorites = async () => {
  const { data } = await axios.get<FavoritesData>(`/likes/favorites`, bearer());
  return data;
};
