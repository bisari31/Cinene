import axios from 'axios';

import { SERVER_HOST } from 'utils/api';

export const getContent = async (type?: string, id?: number) => {
  if (!type) return null;

  const { data } = await axios.get<CustomResponse<{ content: CineneData }>>(
    `${SERVER_HOST}/contents/${type}/${id}`,
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
    `${SERVER_HOST}/contents`,
    body,
  );
  return data;
};

export const getTopRated = async () => {
  const { data } = await axios.get<TopRatedData>(
    `${SERVER_HOST}/contents/top-rated`,
  );
  return data;
};
