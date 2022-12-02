import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { auth } from 'services/auth';
import { userIdState } from 'atom/user';

export const useAuthQuery = (id?: string) => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const data = useQuery(['auth', userId], auth, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (id) setUserId(id);
  }, [id, setUserId]);

  return data;
};
