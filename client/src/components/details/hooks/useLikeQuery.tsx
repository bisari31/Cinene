import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getLikes, like } from 'services/like';
import { cineneKeys } from 'utils/queryOptions';

import useAuthQuery from '../../../hooks/cinene/useAuth';

export default function useLikeQuery(
  type: 'comments' | 'content',
  id: string | undefined,
  openModal: (msg?: string) => void,
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
      const previousData = queryClient.getQueryData<CustomResponse<LikeData>>(
        cineneKeys.likes(type, id, !!auth),
      );
      if (previousData) {
        queryClient.setQueryData(cineneKeys.likes(type, id, !!auth), {
          ...previousData,
          isLike: !previousData.isLike,
          likes: previousData.isLike
            ? previousData.likes - 1
            : previousData.likes + 1,
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
        queryClient.setQueryData(
          cineneKeys.likes(type, id, !!auth),
          context.previousData,
        );
      }
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.likes(type, id)),
  });
  return { auth, data, mutate, setAuth };
}
