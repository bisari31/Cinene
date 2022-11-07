import styled from 'styled-components';
import { IComment } from 'types/comment';
import AddCommentForm from '../AddCommentForm';
import CommentItem from '../CommentItem';

interface IProps {
  commentId: string;
  data?: IComment[];
}

export default function ReplyComment({ commentId, data }: IProps) {
  return (
    <ReplyCommentWrapper>
      <ul>
        {data?.map((comment) => (
          <CommentItem key={comment._id} comment={comment} isReply />
        ))}
      </ul>
      <AddCommentForm isNested commentId={commentId} />
    </ReplyCommentWrapper>
  );
}

const ReplyCommentWrapper = styled.div``;
