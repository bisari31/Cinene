import axios from 'axios';

interface IBody {
  comment: string;
  contentId?: string;
  responseTo?: string;
}

export interface Response {
  success: boolean;
  message?: string;
  comments: Comment[];
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
