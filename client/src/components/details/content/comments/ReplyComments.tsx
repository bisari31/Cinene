import styled from 'styled-components';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface Props {
  comments?: Comment[];
  responseId?: string;
}

export default function ReplyComments({ comments, responseId }: Props) {
  return (
    <StyledWrapper>
      {comments?.map((item) => (
        <CommentItem
          key={item._id}
          commentItem={item}
          isResponse={!!responseId}
        />
      ))}
      <CommentForm responseId={responseId} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
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
