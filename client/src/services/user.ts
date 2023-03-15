import axios from 'axios';

type Body = {
  email: string;
  password: string;
  nickname: string;
};

export const auth = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await axios.get<ICustomResponse & { accessToken?: string }>(
    '/auth',
    {
      headers: { authorization: `Bearer ${accessToken}` },
    },
  );
  return data;
};

export const logout = async () => {
  const { data } = await axios.get<{ success: boolean }>('/auth/logout');
  return data;
};

export const login = async (body: Body) => {
  const { data } = await axios.post<
    ICustomResponse & {
      accessToken?: string;
    }
  >('/auth/login', body);
  return data;
};

export const register = async (body: Body) => {
  const { data } = await axios.post<
    ICustomResponse & {
      hasNickname?: boolean;
      hasEmail?: boolean;
    }
  >('/auth/register', body);
  return data;
};

export const unregister = async () => {
  const { data } = await axios.delete('/auth');
  return data;
};

export const checkPassword = async (password: Pick<Body, 'password'>) => {
  const { data } = await axios.post<Response>('/auth/check-password', password);
  return data;
};
export const changePassword = async (body: {
  password: string;
  nextPassword: string;
}) => {
  const { data } = await axios.patch<{ success: boolean; message: string }>(
    '/auth/password',
    body,
  );
  return data;
};

export const changeNickname = async (nickname: string) => {
  const { data } = await axios.patch<Response>('/auth/nickname', {
    nickname,
  });
  return data;
};

export const kakaoLogin = async (code: string) => {
  const { data } = await axios.get<{
    success: boolean;
    user: IUser;
    id: string;
    info?: { nickname?: string; email: string };
  }>(`/auth/kakao-login/${code}`);

  return data;
};
