import axios from 'axios';

type Body = {
  email: string;
  password: string;
  nickname: string;
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER;

export const bearer = () => {
  const token = localStorage.getItem('accessToken');
  return { headers: { authorization: `Bearer ${token}` } };
};

export const setAccessToken = (data: { accessToken?: string }) => {
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }
};

export const autheticate = async () => {
  const { data } = await axios.get<CustomResponse<{ user: User }>>(
    '/user',
    bearer(),
  );
  return data;
};

export const logout = async () => {
  const { data } = await axios.get<CustomResponse>('/user/logout', bearer());
  return data;
};

export const login = async (body: Body) => {
  const { data } = await axios.post<
    CustomResponse<{
      accessToken: string;
      user: User;
    }>
  >('/user/login', body);
  setAccessToken(data);
  return data;
};

export const register = async (body: Body) => {
  const { data } = await axios.post<
    CustomResponse<{ hasNickname?: boolean; hasEmail?: boolean }>
  >('/user/register', body);
  return data;
};

export const unregister = async () => {
  const { data } = await axios.delete<CustomResponse>('/user', bearer());
  return data;
};

export const changePassword = async (password: string) => {
  const { data } = await axios.patch<CustomResponse>(
    '/user/password',
    { password },
    bearer(),
  );
  setAccessToken(data);
  return data;
};

export const changeNickname = async (nickname: string) => {
  const { data } = await axios.patch<CustomResponse<{ user: User }>>(
    '/user/nickname',
    {
      nickname,
    },
    bearer(),
  );
  setAccessToken(data);
  return data;
};

export const kakaoLogin = async (code: string) => {
  const { data } = await axios.get<CustomResponse<{ user: User }>>(
    `/user/kakao/${code}`,
  );
  setAccessToken(data);
  return data;
};

export const kakaoRegister = async (body: Omit<Body, 'password'>) => {
  const { data } = await axios.post('/user/kakao', body);
  return data;
};

export const kakaoUnregister = async (id?: string) => {
  const { data } = await axios.delete(`/user/kakao/${id}`, bearer());
  return data;
};
