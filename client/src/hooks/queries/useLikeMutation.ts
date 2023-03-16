import { useMutation, useQueryClient } from 'react-query';
import { like } from 'services/like';
import { cineneKeys } from 'utils/keys';

export default function useLikeMutation() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(like, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(cineneKeys.favorites());
      const previousData = queryClient.getQueryData<FavoritesData>(
        cineneKeys.favorites(),
      );
      if (previousData) {
        queryClient.setQueryData<FavoritesData>(cineneKeys.favorites(), {
          ...previousData,
          contents: previousData.contents.filter(
            (content) => content.contentId._id !== data.id,
          ),
        });
      }
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(cineneKeys.favorites(), context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.favorites()),
  });

  return mutate;
}
