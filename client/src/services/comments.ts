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
  try {
    if (!body.contentId) return;
    const { data } = await axios.post<Response>('/comment', body);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err);
    }
  }
};

export const getComments = async (id?: string) => {
  // try {
  //   if (!id) return;
  //   const { data } = await axios.get<Response>(`/comment/${id}`);
  //   return data;
  // } catch (err) {
  //   if (axios.isAxiosError(err)) {
  //     return err.response?.data;
  //   }
  // }
  if (!id) return;
  const { data } = await axios.get<Response>(`/comment/${id}`);
  return data;
};
