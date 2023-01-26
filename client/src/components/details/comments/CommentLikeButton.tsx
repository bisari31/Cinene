import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { Heart } from 'assets';
import { getCommentsLikes } from 'services/like';
import { useAuthQuery } from 'hooks/useAuthQuery';
import { Button } from 'styles/css';

interface IProps {
  commentId: string | undefined;
}

export default function CommentLikeButton({ commentId }: IProps) {
  const { data: authData } = useAuthQuery();

  const { data } = useQuery(['likes', 'comments'], () =>
    getCommentsLikes(commentId, authData?.user?._id),
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Button type="button">
      <Heart />
    </Button>
  );
}
