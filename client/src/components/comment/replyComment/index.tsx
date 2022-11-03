import styled from 'styled-components';
import AddCommentForm from '../AddCommentForm';

export default function ReplyComment() {
  return (
    <ReplyCommentWrapper>
      <AddCommentForm isNested />
    </ReplyCommentWrapper>
  );
}

const ReplyCommentWrapper = styled.div``;
