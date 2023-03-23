import axios from 'axios';
import { bearer, getAccessToken } from './user';

interface Body {
  comment: string;
  contentId?: string;
  responseTo?: string;
}

export const createComment = async (body: Body) => {
  if (!body.contentId) return null;
  const { data } = await axios.post<CustomResponse>(
    '/comments',
    body,
    bearer(),
  );
  getAccessToken(data);
  return data;
};

export const getComments = async (id?: string) => {
  if (!id) return null;
  const { data } = await axios.get<CustomResponse<{ comments: Comment[] }>>(
    `/comments/${id}`,
  );
  return data;
};

export const deleteComment = async (id?: string) => {
  if (!id) return null;
  const { data } = await axios.delete(`/comments/${id}`, bearer());
  getAccessToken(data);
  return data;
};

export const editComment = async (id: string) => {
  const { data } = await axios.patch(`/comments/${id}`);
  return data;
};
