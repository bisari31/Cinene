import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { authUserState } from 'atom/atom';

export default function useMutationOptions(
  toggleModal: (message?: string) => void,
) {
  const setAuth = useSetRecoilState(authUserState);
  const queryClient = useQueryClient();

  const errorHandler = useCallback(
    ({ response }: AxiosError) => {
      if (response.status === 401) {
        setAuth(null);
        toggleModal();
      } else {
        toggleModal(`${response.data.message} 😭`);
      }
    },
    [setAuth, toggleModal],
  );

  return { queryClient, errorHandler };
}
