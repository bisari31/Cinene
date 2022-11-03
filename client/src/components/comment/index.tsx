import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getComments } from 'services/comment';
import { IComment } from 'types/comment';

import AddCommentForm from './AddCommentForm';
import CommentItem from './CommentItem';

export interface IProps {
  postId?: string;
}

export default function CommentWrapper({ postId = '' }: IProps) {
  const { data } = useQuery<IComment[]>(['comment', postId], () =>
    getComments(postId),
  );

  return (
    <Wrapper>
      <ul>
        {data?.map((item) => (
          <CommentItem key={item._id} data={item} />
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
