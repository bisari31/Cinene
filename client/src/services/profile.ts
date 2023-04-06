import axios from 'axios';

import { bearer } from './user';

export const uploadProfile = async (file: FormData) => {
  const { data } = await axios.post<CustomResponse<{ user?: User }>>(
    '/profile',
    file,
    bearer(),
  );
  return data;
};
