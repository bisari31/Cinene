import axios from 'axios';

export const IMAGE_URL = 'http://image.tmdb.org/t/p';
export const TMDB_HOST = 'https://api.themoviedb.org/3';

const params = { language: 'ko', api_key: process.env.REACT_APP_API_KEY };

export const getTrendingMedia = async () => {
  const { data } = await axios.get<TrendingData>(
    `${TMDB_HOST}/trending/all/week`,
    {
      params,
    },
  );
  return data.results;
};

export const getMediaDetail = async (id?: number, type?: string) => {
  if (!id || !type) return undefined;
  const { data } = await axios.get<MovieDetails | TvDetails>(
    `${TMDB_HOST}/${type}/${id}`,
    {
      params,
    },
  );
  return data;
};

export const getPersonDetail = async (id?: number, type?: string) => {
  if (!id || !type) return undefined;
  const { data } = await axios.get<PersonDetails>(
    `${TMDB_HOST}/${type}/${id}`,
    {
      params,
    },
  );
  return data;
};

export const getFilmography = async (id: number) => {
  const { data } = await axios.get<CombinedCredits>(
    `${TMDB_HOST}/person/${id}/combined_credits`,
    {
      params,
    },
  );
  return data;
};

export const getCasts = async (id: number, type: string) => {
  const { data } = await axios.get<Credits>(
    `${TMDB_HOST}/${type}/${id}/credits`,
    {
      params,
    },
  );
  return data;
};

export const getSimilarMedia = async (id: number, type: string) => {
  const { data } = await axios.get<TrendingData>(
    `${TMDB_HOST}/${type}/${id}/similar`,
    {
      params,
    },
  );
  return data.results;
};

export const getUpcomingMovie = async () => {
  const { data } = await axios.get<MoviesData>(`${TMDB_HOST}/movie/upcoming`, {
    params: {
      region: 'KR',
      ...params,
    },
  });
  return data.results;
};

export const getTopRatedMovie = async () => {
  const { data } = await axios.get<MoviesData>(`${TMDB_HOST}/movie/top_rated`, {
    params: {
      region: 'KR',
      ...params,
    },
  });
  return data.results;
};

export const getNowPlayingMovie = async () => {
  const { data } = await axios.get<MoviesData>(
    `${TMDB_HOST}/movie/now_playing`,
    {
      params: {
        region: 'KR',
        ...params,
      },
    },
  );
  return data.results;
};
export const getSearchResults = async (query: string) => {
  const { data } = await axios.get<SearchData>(`${TMDB_HOST}/search/multi`, {
    params: {
      query,
      ...params,
    },
  });
  return data.results;
};
