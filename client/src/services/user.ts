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
  return data;
};

export const register = async (body: Body) => {
  const { data } = await axios.post<
    CustomResponse<{ hasNickname?: boolean; hasEmail?: boolean }>
  >('/user/register', body);
  return data;
};

export const unregister = async () => {
  const { data } = await axios.delete('/user');
  return data;
};

export const checkPassword = async (password: Pick<Body, 'password'>) => {
  const { data } = await axios.post<Response>('/user/check-password', password);
  return data;
};
export const changePassword = async (body: {
  password: string;
  nextPassword: string;
}) => {
  const { data } = await axios.patch<{ success: boolean; message: string }>(
    '/user/password',
    body,
  );
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
  getAccessToken(data);
  return data;
};

export const kakaoLogin = async (code: string) => {
  const { data } = await axios.get<{
    success: boolean;
    user: User;
    id: string;
    info?: { nickname?: string; email: string };
  }>(`/user/kakao-login/${code}`);

  return data;
};
