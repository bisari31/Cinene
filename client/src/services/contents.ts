import axios from 'axios';

export const getContent = async (type?: string, id?: number) => {
  if (!type) return null;

  const { data } = await axios.get<CustomResponse<{ content: CineneData }>>(
    `/api/contents/${type}/${id}`,
  );
  return data;
};

export const createContent = async (body?: {
  content_type?: string;
  tmdbId?: number;
  title?: string;
  poster_url?: string | null;
}) => {
  if (!body) return null;
  const { data } = await axios.post<CustomResponse<{ content: CineneData }>>(
    '/api/contents',
    body,
  );
  return data;
};

export const getTopRated = async () => {
  const { data } = await axios.get<TopRatedData>('/api/contents/top-rated');
  return data;
};
