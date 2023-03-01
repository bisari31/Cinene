import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getLikes, upLike } from 'services/like';
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
  const querykey = ['likes', type, id, { loggedIn: authData?.success }];

  const { data } = useQuery(
    ['likes', type, id, { loggedIn: authData?.success }],
    () => getLikes(IdType, id, authData?.user?._id),
  );

  const { mutate } = useMutation(upLike, {
    onMutate: async () => {
      await queryClient.cancelQueries(querykey);
      const previousData = queryClient.getQueryData<IResponse>(querykey);
      if (previousData) {
        queryClient.setQueryData<IResponse>(querykey, {
          ...previousData,
          isLike: !previousData.isLike,
          likes: previousData.isLike
            ? previousData.likes - 1
            : previousData.likes + 1,
        });
      }
      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(querykey, context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries(['likes', type, id]),
  });
  return { authData, data, mutate };
}
