import axios from 'axios';

type Body = {
  email: string;
  password: string;
  nickname: string;
};

export const bearer = () => {
  const token = localStorage.getItem('accessToken');
  return { headers: { authorization: `Bearer ${token}` } };
};

export const getAccessToken = (data: { accessToken?: string }) => {
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }
};

export const autheticate = async () => {
  const { data } = await axios.get<CustomResponse<{ user: User }>>(
    '/api/user',
    bearer(),
  );
  return data;
};

export const logout = async () => {
  const { data } = await axios.get<CustomResponse>(
    '/api/user/logout',
    bearer(),
  );
  return data;
};

export const login = async (body: Body) => {
  const { data } = await axios.post<
    CustomResponse<{
      accessToken: string;
      user: User;
    }>
  >('/api/user/login', body);
  getAccessToken(data);
  return data;
};

export const register = async (body: Body) => {
  const { data } = await axios.post<
    CustomResponse<{ hasNickname?: boolean; hasEmail?: boolean }>
  >('/api/user/register', body);
  return data;
};

export const unregister = async () => {
  const { data } = await axios.delete<CustomResponse>('/api/user', bearer());
  return data;
};

export const changePassword = async (password: string) => {
  const { data } = await axios.patch<CustomResponse>(
    '/api/user/password',
    { password },
    bearer(),
  );
  getAccessToken(data);
  return data;
};

export const changeNickname = async (nickname: string) => {
  const { data } = await axios.patch<CustomResponse<{ user: User }>>(
    '/api/user/nickname',
    {
      nickname,
    },
    bearer(),
  );
  getAccessToken(data);
  return data;
};

export const kakaoLogin = async (code: string) => {
  const { data } = await axios.get<CustomResponse<{ user: User }>>(
    `/api/user/kakao/${code}`,
  );
  getAccessToken(data);
  return data;
};

export const kakaoRegister = async (body: Omit<Body, 'password'>) => {
  const { data } = await axios.post('/api/user/kakao', body);
  return data;
};

export const kakaoUnregister = async (id?: string) => {
  const { data } = await axios.delete(`/api/user/kakao/${id}`, bearer());
  return data;
};
