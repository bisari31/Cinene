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
      `/like/content/${id}${userId ? `?userId=${userId}` : ''}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCommentsLikes = async (id?: string, userId?: string) => {
  try {
    const { data } = await axios.get<IResponse>(
      `/like/comments/${id}${userId ? `?userId=${userId}` : ''}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const upLike = async (id?: string) => {
  if (!id) return;
  const { data } = await axios.post<IResponse>(`/like/${id}`);
  return data;
};
