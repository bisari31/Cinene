export const getMediaTitle = (data?: IMovieDetails | ITvDetails) => {
  if (!data) return;
  if ('title' in data) return data.title;
  return data.name;
};

export const getMediaOverview = (data?: IMovieDetails | ITvDetails) => {
  if (!data) return;
  return 'overview' in data && data.overview;
};

const REDIRECT_URI = 'http://localhost:3000/login';
const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN;

export const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
