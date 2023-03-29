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
    '/api/comments',
    body,
    bearer(),
  );
  getAccessToken(data);
  return data;
};

export const getComments = async (id?: string) => {
  if (!id) return null;
  const { data } = await axios.get<CustomResponse<{ comments: Comment[] }>>(
    `/api/comments/${id}`,
  );
  return data;
};

export const deleteComment = async (id?: string) => {
  if (!id) return null;
  const { data } = await axios.delete(`/api/comments/${id}`, bearer());
  getAccessToken(data);
  return data;
};

export const editComment = async (obj: { id?: string; comment: string }) => {
  if (!obj.id) return null;
  const { data } = await axios.patch(
    `/api/comments/${obj.id}`,
    { comment: obj.comment },
    bearer(),
  );
  getAccessToken(data);
  return data;
};
