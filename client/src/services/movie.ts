import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'http://image.tmdb.org/t/p';

const API_KEY = process.env.REACT_APP_API_KEY;
const params = { language: 'ko' };

export const getPopularMovies = async () => {
  const { data } = await axios.get<IMovieData>(
    `${API_URL}/trending/all/week?api_key=${API_KEY}`,
    {
      params,
    },
  );
  return data.results;
};
