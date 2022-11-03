import axios from 'axios';
import { IComment } from 'types/comment';

interface IBody {
  comment: string;
  postId?: string;
  writer: string;
}

export const createComment = async (body: IBody) => {
  try {
    const { data } = await axios.post('/comment/create', body);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const getComments = async (postId: string) => {
  try {
    const { data } = await axios.get<IComment[]>(`/comment/${postId}`);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};
