import { useQuery } from 'react-query';

import { getComments } from 'services/comment';
import { IComment } from 'types/comment';

export const useGetCommentsQuery = (
  postId: string | undefined,
  commentId?: string,
) => {
  const query = useQuery<IComment[]>(
    ['comment', postId],
    () => getComments(postId),
    {
      select: (data) => {
        if (!commentId) return data?.filter((item) => !item.responseTo);
        return data?.filter((item) => item.responseTo === commentId);
      },
    },
  );
  return query;
};
