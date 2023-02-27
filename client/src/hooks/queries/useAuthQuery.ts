import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { auth } from 'services/user';
import { userIdState } from 'atom/atom';
import { userKeys } from 'utils/keys';
import usePrevious from '../usePrevious';

export default function useAuthQuery() {
  const userId = useRecoilValue(userIdState);
  const prevUserId = usePrevious(userId);

  const data = useQuery(userKeys.auth(userId), auth, {
    retry: 1,
    enabled: userId !== prevUserId,
  });

  return data;
}
