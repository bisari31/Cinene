import styled from 'styled-components';

import { IComment } from 'types/comment';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface IProps {
  comments: IComment[] | undefined;
  responseId: string | undefined;
}

export default function ReplyComments({ comments, responseId }: IProps) {
  return (
    <ReplyCommentsWrapper>
      {comments?.map((item) => (
        <CommentItem
          key={item._id}
          commentItem={item}
          isResponse={!!responseId}
        />
      ))}
      <CommentForm responseId={responseId} />
    </ReplyCommentsWrapper>
  );
}

const ReplyCommentsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  & > div {
    margin-top: 1em;
  }
  & > div,
  form {
    width: 93%;
  }
`;
