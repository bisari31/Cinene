import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getLikes, upLike } from 'services/like';
import { useAuthQuery } from './useAuthQuery';

export default function useLike(type: 'comments' | 'content', id?: string) {
  const { data: authData } = useAuthQuery();

  const client = useQueryClient();

  const IdType = type === 'comments' ? 'commentId' : 'contentId';

  const { data } = useQuery(
    ['likes', type, id, { loggedIn: authData?.success }],
    () => getLikes(IdType, id, authData?.user?._id),
  );
  const { mutate } = useMutation(upLike, {
    onSuccess: () => {
      client.invalidateQueries(['likes', type, id]);
    },
  });
  return { authData, data, mutate };
}
