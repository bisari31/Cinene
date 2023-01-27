import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { auth } from 'services/auth';
import { userIdState } from 'atom/atom';

export const useAuthQuery = () => {
  const userId = useRecoilValue(userIdState);
  const data = useQuery(['auth', userId], auth, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  return data;
};
