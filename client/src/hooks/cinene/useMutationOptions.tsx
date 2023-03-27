import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { authUserState } from 'atom/atom';

export default function useMutationOptions(modal: (message?: string) => void) {
  const setAuth = useSetRecoilState(authUserState);
  const queryClient = useQueryClient();

  const errorHandler = useCallback(
    ({ response }: AxiosError) => {
      if (response.status === 401) {
        setAuth(null);
        modal();
      } else {
        modal(`${response.data.message} 😭`);
      }
    },
    [setAuth, modal],
  );

  return { queryClient, errorHandler };
}
