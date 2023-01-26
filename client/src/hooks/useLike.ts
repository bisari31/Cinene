import { useMutation, useQuery } from 'react-query';

import { getLikes, upLike } from 'services/like';
import { queryClient } from 'index';
import { useAuthQuery } from './useAuthQuery';

export default function useLike(type: 'comments' | 'content', id?: string) {
  const { data: authData } = useAuthQuery();

  const IdType = type === 'comments' ? 'commentId' : 'contentId';

  const { data } = useQuery(
    ['likes', type, id, { loggedIn: authData?.success }],
    () => getLikes(IdType, id, authData?.user?._id),
  );
  const { mutate } = useMutation(upLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes', type, id]);
    },
  });
  return { authData, data, mutate };
}
