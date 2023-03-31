import axios from 'axios';

import { bearer, setAccessToken } from './user';

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
  setAccessToken(data);
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
  setAccessToken(data);
  return data;
};

export const editComment = async (obj: { id?: string; comment: string }) => {
  if (!obj.id) return null;
  const { data } = await axios.patch(
    `/comments/${obj.id}`,
    { comment: obj.comment },
    bearer(),
  );
  setAccessToken(data);
  return data;
};
