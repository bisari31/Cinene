import { useMutation } from 'react-query';

import { like } from 'services/like';
import { cineneKeys } from 'utils/queryOptions';
import useMutationOptions from 'hooks/cinene/useMutationOptions';

export default function useLikeMutation(openModal: (msg?: string) => void) {
  const { errorHandler, queryClient } = useMutationOptions(openModal);

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
      errorHandler(err);
      if (context?.previousData) {
        queryClient.setQueryData(cineneKeys.favorites(), context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.favorites()),
  });

  return mutate;
}
