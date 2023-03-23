import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { like } from 'services/like';
import { cineneKeys } from 'utils/keys';
import useAuthQuery from '../../header/hooks/useAuthQuery';

export default function useLikeMutation(openModal: () => void) {
  const { setAuth } = useAuthQuery();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(like, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(cineneKeys.favorites());
      const previousData = queryClient.getQueryData<FavoritesData>(
        cineneKeys.favorites(),
      );
      if (previousData) {
        queryClient.setQueryData(cineneKeys.favorites(), {
          ...previousData,
          contents: previousData.contents.filter(
            ({ content }) => content._id !== data.id,
          ),
        });
      }
      return { previousData };
    },
    onError: (err: AxiosError, variables, context) => {
      if (err.response?.status === 401) {
        setAuth(null);
        openModal();
      }
      if (context?.previousData) {
        queryClient.setQueryData(cineneKeys.favorites(), context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.favorites()),
  });

  return mutate;
}
