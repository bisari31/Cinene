import axios from 'axios';

interface ResponseData {
  success: boolean;
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
  const { data } = await axios.post<ResponseData>('/users/login', body);
  return data;
};

export const register = async (body: IBody) => {
  const { data } = await axios.post<ResponseData>('/users/register', body);
  return data;
};

export const unregister = async () => {
  const { data } = await axios.delete('/users/unregister');
  return data;
};

export const checkPassword = async (password: Pick<IBody, 'password'>) => {
  const { data } = await axios.post('/users/check-password', password);
  return data;
};
export const changePassword = async (body: {
  password: string;
  newPassword: string;
}) => {
  const { data } = await axios.put<{ success: boolean; message: string }>(
    '/users/changePassword',
    body,
  );
  return data;
};

export const changeNickname = async (body: { nickname: string }) => {
  const { data } = await axios.put<ResponseData>('/users/changeNickname', body);
  return data;
};
