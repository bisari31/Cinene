import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { auth } from 'services/auth';
import { userIdState } from 'atom/atom';
import usePrevious from './usePrevious';

export const useAuthQuery = () => {
  const userId = useRecoilValue(userIdState);
  const prevUserId = usePrevious(userId);
  const data = useQuery(['auth', userId], auth, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: userId !== prevUserId,
  });

  return data;
};
