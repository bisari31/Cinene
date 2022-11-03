import { useQuery } from 'react-query';
import { getComments } from 'services/comment';
import styled from 'styled-components';
import { IComment } from 'types/comment';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

interface IProps {
  postId?: string;
  userId: string;
}

export default function CommentWrapper({ postId = '', userId }: IProps) {
  const { data } = useQuery<IComment[]>(['comment', postId], () =>
    getComments(postId),
  );

  return (
    <Wrapper>
      {!data?.length ? (
        <input type="text" placeholder="작성된 댓글이 없습니다." readOnly />
      ) : (
        <ul>
          {data.map((item) => (
            <CommentItem key={item._id} data={item} />
          ))}
        </ul>
      )}
      <AddComment postId={postId} userId={userId} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
  & > input {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.config.border2};
    font-size: 12px;
    padding: 0.7em;
  }
`;
