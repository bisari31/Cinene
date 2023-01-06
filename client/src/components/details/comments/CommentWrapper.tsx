import { useState } from 'react';
import { useQuery } from 'react-query';
import { getComments } from 'services/comments';
import styled, { css } from 'styled-components';
import { buttonEffect } from 'styles/css';

import { IComment } from 'types/comment';

import CommentItem from './CommentItem';
import ReplyCommentWrapper from './ReplyCommentWrapper';

interface IProps {
  comment?: IComment;
  contentId?: string;
}
export default function CommentWrapper({ comment, contentId }: IProps) {
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const { data: commentsData } = useQuery(
    ['comments', contentId],
    () => getComments(contentId),
    {
      select: (prevData) =>
        prevData?.comments.filter((item) => item.responseTo === comment?._id),
    },
  );

  if (comment?.responseTo) return null;

  return (
    <CommentWrapperWrapper color="navy">
      <CommentItem comment={comment} />
      <button
        type="button"
        onClick={() => setOpenReplyComments(!openReplyComments)}
      >
        답글 {`${commentsData?.length} 개`}
      </button>
      {openReplyComments && <ReplyCommentWrapper />}
    </CommentWrapperWrapper>
  );
}

const CommentWrapperWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.navy50};
    border-radius: 10px;
    display: flex;
    padding: 1em;
    img {
      border-radius: 50%;
      height: 40px;
      margin-right: 1em;
      object-fit: cover;
      width: 40px;
    }
    button {
      background: none;
      border: none;
      border-radius: 7px;
      color: ${theme.colors.gray100};
      cursor: pointer;
      font-size: 0.8rem;
      padding: 0.5em 1em;
      ${buttonEffect};
    }
    & + & {
      margin-top: 1.3em;
    }
  `}
`;
