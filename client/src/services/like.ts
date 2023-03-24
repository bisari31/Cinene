import axios from 'axios';
import { bearer, getAccessToken } from './user';

type Type = 'content' | 'comment';

export const getLikes = async (type: Type, id?: string, userId?: string) => {
  if (!id) return null;
  const { data } = await axios.get<CustomResponse<LikeData>>(
    `/likes/${type}/${id}`,
    {
      params: { userId },
    },
  );
  return data;
};

export const like = async (body: { id?: string; type: Type }) => {
  const { id, type } = body;
  if (!id) return null;
  const { data } = await axios.post<CustomResponse>(
    `/likes/${type}/${id}`,
    null,
    bearer(),
  );
  getAccessToken(data);
  return data;
};

export const getFavorites = async () => {
  const { data } = await axios.get<FavoritesData>(`/likes/favorites`, bearer());
  getAccessToken(data);
  return data;
};
