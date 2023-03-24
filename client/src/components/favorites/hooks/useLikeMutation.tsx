import { useMutation, useQueryClient } from 'react-query';

import { like } from 'services/like';
import { cineneKeys } from 'utils/keys';
import useAuthQuery from '../../header/hooks/useAuthQuery';

export default function useLikeMutation(openModal: (msg?: string) => void) {
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
    onError: ({ response }: AxiosError, variables, context) => {
      if (response.status === 401) {
        setAuth(null);
        openModal();
      } else {
        openModal(`${response.data.message} 😭`);
      }
      if (context?.previousData) {
        queryClient.setQueryData(cineneKeys.favorites(), context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.favorites()),
  });

  return mutate;
}
