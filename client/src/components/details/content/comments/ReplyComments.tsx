import styled from 'styled-components';

import { LoginPortalProps } from 'components/hoc/withLoginPortal';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface Props extends LoginPortalProps {
  comments?: Comment[];
  responseId?: string;
}

export default function ReplyComments({
  comments,
  responseId,
  toggleLoginModal,
}: Props) {
  return (
    <ReplyCommentsWrapper>
      {comments?.map((item) => (
        <CommentItem
          toggleLoginModal={toggleLoginModal}
          key={item._id}
          commentItem={item}
          isResponse={!!responseId}
        />
      ))}
      <CommentForm
        responseId={responseId}
        toggleLoginModal={toggleLoginModal}
      />
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
