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
  const { data } = await axios.get<{ isLoggedIn: boolean; user: IUser }>(
    '/auth',
  );
  return data;
};

export const logout = async () => {
  const { data } = await axios.get<{ success: boolean }>('/auth/logout');
  return data;
};

export const login = async (body: IBody) => {
  const { data } = await axios.post<ResponseData>('/auth/login', body);
  return data;
};

export const register = async (body: IBody) => {
  const { data } = await axios.post<ResponseData>('/auth/register', body);
  return data;
};

export const deleteUser = async () => {
  const { data } = await axios.delete('/auth/deleteUser');
  return data;
};
export const updateUser = async (body: IBody) => {
  const { data } = await axios.put('/auth/updateuser', body);
  return data;
};
