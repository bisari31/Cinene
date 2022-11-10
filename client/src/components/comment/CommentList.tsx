import { useGetCommentsQuery } from 'hooks/useGetCommentsQuery';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IComment } from 'types/comment';

import CommentItem from './CommentItem';
import ReplyComment from './replyComment';

interface IProps {
  comment: IComment;
}

export default function CommentList({ comment }: IProps) {
  const [showReplyComment, setShowReplyComment] = useState(false);

  const { id } = useParams();
  const { data } = useGetCommentsQuery(id, comment._id);

  const toggleReplyComment = () => {
    setShowReplyComment(!showReplyComment);
  };

  return (
    <CommentListWrapper>
      <CommentItem
        replyCommentsNum={data?.length}
        comment={comment}
        toggleReplyComment={toggleReplyComment}
      />
      {showReplyComment && <ReplyComment data={data} commentId={comment._id} />}
    </CommentListWrapper>
  );
}

const CommentListWrapper = styled.li`
  display: flex;
  flex-direction: column;
`;
