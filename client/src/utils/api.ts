const KAKAO_HOST = 'https://kauth.kakao.com';
export const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
export const REDIRECT_URI = `${process.env.REACT_APP_SERVER_HOST}/login`;
export const KAKAO_URI = `${KAKAO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_LOGOUT_URI = `${KAKAO_HOST}/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`;
