import axios from 'axios';
import { bearer } from './user';

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
  return data;
};

export const getComments = async (id?: string) => {
  if (!id) return null;
  const { data } = await axios.get<CustomResponse<{ comments: Comment[] }>>(
    `/comments/${id}`,
  );
  return data;
};
