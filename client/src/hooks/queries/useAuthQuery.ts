import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { auth } from 'services/user';
import { accessTokenState } from 'atom/atom';
import { userKeys } from 'utils/keys';
import usePrevious from '../usePrevious';

export default function useAuthQuery() {
  const accessToken = useRecoilValue(accessTokenState);
  const prevAccessToken = usePrevious(accessToken);

  const data = useQuery(userKeys.auth(accessToken), auth, {
    retry: 1,
    enabled: accessToken !== prevAccessToken,
  });

  return data;
}
