import styled from 'styled-components';

import { useGetCommentsQuery } from 'hooks/useGetCommentsQuery';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';

type PostId = { postId: string | undefined };

export default function CommentWrapper({ postId }: PostId) {
  const { data } = useGetCommentsQuery(postId);

  return (
    <Wrapper>
      <ul>
        {data?.map((item) => (
          <CommentList key={item._id} comment={item} />
        ))}
      </ul>
      <AddCommentForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;
