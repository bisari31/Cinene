import axios from 'axios';

// interface IContentBody {
//   tmdbId: number;
//   type: string;
//   poster: string;
//   backdrop: string;
//   name: string;
// }

interface IResponse {
  success: boolean;
  content: IContent | null;
  message?: string;
}

export interface IContent {
  _id: string;
  type: string;
  name: string;
  poster: string;
  tmdbId: number;
  count: number;
  average: number;
}

export const getContent = async (type?: string, id?: number) => {
  if (!type) return;
  const { data } = await axios.get<IResponse>(`/content/${type}/${id}`);
  return data;
};

export const addContent = async (
  type?: string,
  body?: {
    tmdbId?: number;
    name: string;
    poster: string;
  },
) => {
  if (!body) return;
  const { data } = await axios.post<IResponse>('/content', {
    ...body,
    type,
  });
  return data;
};
