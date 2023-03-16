import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'http://image.tmdb.org/t/p';

const params = { language: 'ko', api_key: process.env.REACT_APP_API_KEY };

export const getTrendingMedia = async () => {
  const { data } = await axios.get<MediaData>(`${API_URL}/trending/all/week`, {
    params,
  });
  return data.results;
};

export const getMediaDetail = async (id?: number, type?: string) => {
  const { data } = await axios.get<MovieDetails | TvDetails>(
    `${API_URL}/${type}/${id}`,
    {
      params,
    },
  );
  return data;
};

export const getPersonDetail = async (id: number, type: string) => {
  const { data } = await axios.get<Person>(`${API_URL}/${type}/${id}`, {
    params,
  });
  return data;
};

export const getCombinedCredits = async (id: number) => {
  const { data } = await axios.get<CombinedCredits>(
    `${API_URL}/person/${id}/combined_credits`,
    {
      params,
    },
  );
  return data;
};

export const getMediaCredits = async (id: number, type: string) => {
  const { data } = await axios.get<Credits>(
    `${API_URL}/${type}/${id}/credits`,
    {
      params,
    },
  );
  return data;
};

export const getSimilarMedia = async (id: number, type: string) => {
  const { data } = await axios.get<MediaData>(
    `${API_URL}/${type}/${id}/similar`,
    {
      params,
    },
  );
  return data.results;
};

export const getVideos = async (id: number, type: string) => {
  const { data } = await axios.get<Videos>(`${API_URL}/${type}/${id}/videos`, {
    params,
  });
  return data.results[0];
};

export const getUpcomingMovie = async () => {
  const { data } = await axios.get<MediaData>(`${API_URL}/movie/upcoming`, {
    params: {
      region: 'KR',
      ...params,
    },
  });
  return data.results;
};

export const getTopRatedMovie = async () => {
  const { data } = await axios.get<MediaData>(`${API_URL}/movie/top_rated`, {
    params: {
      region: 'KR',
      ...params,
    },
  });
  return data.results;
};

export const getNowPlayingMovie = async () => {
  const { data } = await axios.get<MediaData>(`${API_URL}/movie/now_playing`, {
    params: {
      region: 'KR',
      ...params,
    },
  });
  return data.results;
};
export const searchMedia = async (query: string) => {
  const { data } = await axios.get<SearchData>(`${API_URL}/search/multi`, {
    params: {
      query,
      ...params,
    },
  });
  return data.results;
};
