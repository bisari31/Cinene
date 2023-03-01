import axios from 'axios';
import { IComment } from 'types/comment';

interface IBody {
  comment: string;
  contentId?: string;
  responseTo?: string;
}

export interface Response {
  success: boolean;
  message?: string;
  comments: IComment[];
}

export const createComment = async (body: IBody) => {
  if (!body.contentId) return;
  const { data } = await axios.post<Response>('/comments', body);
  return data;
};

export const getComments = async (id?: string) => {
  if (!id) return;
  const { data } = await axios.get<Response>(`/comments/${id}`);
  return data;
};
