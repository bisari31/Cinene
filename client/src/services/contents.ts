import axios from 'axios';

interface IResponse {
  success: boolean;
  content: IFavoritesContents | undefined;
  message?: string;
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
