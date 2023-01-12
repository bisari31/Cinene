import axios from 'axios';

interface IResponse {
  success: boolean;
  likes?: number;
  message?: string;
  isLike?: boolean;
}

export const getContentLikes = async (id?: string, userId?: string) => {
  try {
    const { data } = await axios.get<IResponse>(
      `/like?id=${id}${userId ? `&userId=${userId}` : ''}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const upLike = async (id?: string) => {
  if (!id) return;
  const { data } = await axios.post<IResponse>(`/like?id=${id}`);
  return data;
};
