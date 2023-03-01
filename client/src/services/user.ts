import axios from 'axios';

interface Response {
  success: boolean;
  message: string;
  code?: number;
  user: IUser;
}

interface IBody {
  id?: string;
  email?: string;
  password: string;
  nickname: string;
}

export const auth = async () => {
  const { data } = await axios.get<IAuthData>('/users');
  return data;
};

export const logout = async () => {
  const { data } = await axios.get<{ success: boolean }>('/users/logout');
  return data;
};

export const login = async (body: IBody) => {
  const { data } = await axios.post<Response>('/users/login', body);
  return data;
};

export const register = async (body: IBody) => {
  const { data } = await axios.post<Response>('/users/register', body);
  return data;
};

export const unregister = async () => {
  const { data } = await axios.delete('/users');
  return data;
};

export const checkPassword = async (password: Pick<IBody, 'password'>) => {
  const { data } = await axios.post<Response>(
    '/users/check-password',
    password,
  );
  return data;
};
export const changePassword = async (body: {
  password: string;
  nextPassword: string;
}) => {
  const { data } = await axios.patch<{ success: boolean; message: string }>(
    '/users/password',
    body,
  );
  return data;
};

export const changeNickname = async (nickname: string) => {
  const { data } = await axios.patch<Response>('/users/nickname', {
    nickname,
  });
  return data;
};
