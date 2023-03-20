import axios from 'axios';

interface IResponse {
  success: boolean;
  content: CineneData | undefined;
  message?: string;
}

export const getContent = async (type?: string, id?: number) => {
  if (!type) return null;

  const { data } = await axios.get<IResponse>(`/contents/${type}/${id}`);
  return data;
};

export const addContent = async (body?: {
  type?: string;
  tmdbId?: number;
  name?: string;
  poster?: string | null;
}) => {
  if (!body) return null;
  const { data } = await axios.post<IResponse>('/contents', body);
  return data;
};

export const getTopRated = async () => {
  const { data } = await axios.get<TopRatedData>('/contents/top-rated');
  return data;
};
