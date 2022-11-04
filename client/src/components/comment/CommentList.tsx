import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { IComment } from 'types/comment';
import CommentItem from './CommentItem';
import ReplyComment from './replyComment';

interface IProps {
  comment: IComment;
}

export default function CommentList({ comment }: IProps) {
  const [showReplyComment, setShowReplyComment] = useState(false);

  const handleShowReplyComment = () => {
    setShowReplyComment(!showReplyComment);
  };

  return (
    <CommentListWrapper>
      <CommentItem
        comment={comment}
        handleShowReplyComment={handleShowReplyComment}
      />
      {showReplyComment && <ReplyComment commentId={comment._id} />}
    </CommentListWrapper>
  );
}

const CommentListWrapper = styled.li`
  display: flex;
  flex-direction: column;
`;
