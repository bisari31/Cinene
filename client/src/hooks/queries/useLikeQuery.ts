import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getLikes, upLike } from 'services/like';
import { cineneKeys } from 'utils/keys';
import useAuthQuery from './useAuthQuery';

export interface IResponse {
  success: boolean;
  likes: number;
  isLike: boolean;
}

export default function useLike(type: 'comments' | 'content', id?: string) {
  const { data: authData } = useAuthQuery();

  const IdType = type === 'comments' ? 'commentId' : 'contentId';

  const queryClient = useQueryClient();

  const { data } = useQuery(cineneKeys.likes(type, id, authData?.success), () =>
    getLikes(IdType, id, authData?.user?._id),
  );

  const { mutate } = useMutation(upLike, {
    onMutate: async () => {
      await queryClient.cancelQueries(
        cineneKeys.likes(type, id, authData?.success),
      );
      const previousData = queryClient.getQueryData<IResponse>(
        cineneKeys.likes(type, id, authData?.success),
      );
      if (previousData) {
        queryClient.setQueryData<IResponse>(
          cineneKeys.likes(type, id, authData?.success),
          {
            ...previousData,
            isLike: !previousData.isLike,
            likes: previousData.isLike
              ? previousData.likes - 1
              : previousData.likes + 1,
          },
        );
      }
      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(
          cineneKeys.likes(type, id, authData?.success),
          context.previousData,
        );
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.likes(type, id)),
  });
  return { authData, data, mutate };
}
