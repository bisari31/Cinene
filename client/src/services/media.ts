import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'http://image.tmdb.org/t/p';

const API_KEY = `api_key=${process.env.REACT_APP_API_KEY}`;
// const params = { language: 'ko', sort_by: 'popularity.desc' };
const params = { language: 'ko' };

export const getTrendingMedia = async () => {
  const { data } = await axios.get<IMediaData>(
    `${API_URL}/trending/all/day?${API_KEY}`,
    {
      params,
    },
  );
  return data.results;
};

export const getMediaDetail = async (
  id: number | undefined,
  type: string | undefined,
) => {
  const { data } = await axios.get<IMediaResultsInDetail>(
    `${API_URL}/${type}/${id}?${API_KEY}`,
    {
      params,
    },
  );
  return data;
};

export const getMediaCredits = async (
  id: number | undefined,
  type: string | undefined,
) => {
  const { data } = await axios.get<ICredits>(
    `${API_URL}/${type}/${id}/credits?${API_KEY}`,
    {
      params,
    },
  );
  return data;
};

export const getSimilarMedia = async (
  id: number | undefined,
  type: string | undefined,
) => {
  const { data } = await axios.get<IMediaData>(
    `${API_URL}/${type}/${id}/similar?${API_KEY}`,
    {
      params,
    },
  );
  return data.results;
};

export const getVideos = async (
  id: number | undefined,
  type: string | undefined,
) => {
  const { data } = await axios.get<IVideos>(
    `${API_URL}/${type}/${id}/videos?${API_KEY}`,
    {
      params,
    },
  );
  return data.results[0];
};
