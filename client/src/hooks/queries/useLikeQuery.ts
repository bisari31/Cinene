import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getLikes, like } from 'services/like';
import { cineneKeys } from 'utils/keys';
import useAuthQuery from './useAuthQuery';

export interface IResponse {
  success: boolean;
  likes: number;
  isLike: boolean;
}

export default function useLike(
  type: 'comments' | 'content',
  id: string | undefined,
  toggle: () => void,
) {
  const { auth, setAuth } = useAuthQuery();

  const IdType = type === 'comments' ? 'comment' : 'content';

  const queryClient = useQueryClient();

  const { data } = useQuery(cineneKeys.likes(type, id, !!auth), () =>
    getLikes(IdType, id, auth?._id),
  );

  const { mutate } = useMutation(like, {
    onMutate: async () => {
      await queryClient.cancelQueries(cineneKeys.likes(type, id, !!auth));
      const previousData = queryClient.getQueryData<IResponse>(
        cineneKeys.likes(type, id, !!auth),
      );
      if (previousData) {
        queryClient.setQueryData<IResponse>(
          cineneKeys.likes(type, id, !!auth),
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
    onError: (err: AxiosError, variables, context) => {
      if (err.response.status === 401) {
        setAuth(null);
        toggle();
      }
      if (context?.previousData) {
        queryClient.setQueryData(
          cineneKeys.likes(type, id, !!auth),
          context.previousData,
        );
      }
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.likes(type, id)),
  });
  return { auth, data, mutate };
}
