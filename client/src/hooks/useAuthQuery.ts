import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { auth } from 'services/auth';
import { userIdState } from 'atom/user';

export const useAuthQuery = () => {
  const userId = useRecoilValue(userIdState);
  const data = useQuery(['auth', userId], auth, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  return data;
};
