import { useGetCommentsQuery } from 'hooks/useGetCommentsQuery';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddCommentForm from '../AddCommentForm';
import CommentItem from '../CommentItem';

export default function ReplyComment({ commentId }: { commentId: string }) {
  const { id } = useParams();
  const { data } = useGetCommentsQuery(id, commentId);
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
