import { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { USER_IMAGE } from 'utils/imageUrls';
import { Button, buttonEffect } from 'styles/css';
import { Heart } from 'assets';
import { useLikeQuery, useLoginPortal } from 'hooks/cinene';

import CommentItemData from './CommentItemData';
import ReplyComments from './ReplyComments';

interface Props {
  comments?: Comment[];
  commentItem?: Comment;
  isResponse?: boolean;
}

export default function CommentItem({
  commentItem,
  comments,
  isResponse = false,
}: Props) {
  const [openReplyComment, setOpenReplyComment] = useState(false);
  const { openPortal, renderPortal } = useLoginPortal();
  const { auth, data, mutate } = useLikeQuery(
    'comments',
    commentItem?._id,
    openPortal,
  );

  const handleLikeButton = () => {
    if (!auth) {
      openPortal();
      return;
    }
    mutate({ type: 'comment', id: commentItem?._id });
  };

  const replyComments = useMemo(
    () => comments?.filter((item) => item.responseTo === commentItem?._id),
    [commentItem?._id, comments],
  );

  return (
    <>
      <StyledWrapper key={commentItem?._id} isResponse={isResponse}>
        <img src={commentItem?.author.img || USER_IMAGE} alt="user_poster" />
        <CommentItemData openModal={openPortal} commentItem={commentItem} />
        <StyledButtonWrpper color="navy50">
          <Button
            hasLikes={!!data?.likes}
            type="button"
            onClick={handleLikeButton}
            isActive={data?.isLike}
          >
            <Heart /> {data?.likes ?? '0'}
          </Button>
          {!isResponse && (
            <Button
              isActive={openReplyComment}
              type="button"
              onClick={() => setOpenReplyComment((prev) => !prev)}
            >
              답글 {replyComments?.length}
            </Button>
          )}
        </StyledButtonWrpper>
      </StyledWrapper>
      {openReplyComment && (
        <ReplyComments comments={replyComments} responseId={commentItem?._id} />
      )}
      {renderPortal()}
    </>
  );
}

export const StyledWrapper = styled.div<{ isResponse?: boolean }>`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.navy50};
    border-radius: 10px;
    display: flex;
    padding: 1em;
    img {
      margin-right: 1em;
      border-radius: 50%;
      height: 40px;
      width: 40px;
    }

    & + & {
      margin-top: 1em;
    }
  `}
`;

const StyledButtonWrpper = styled.div`
  align-items: center;
  display: flex;
  button {
    ${buttonEffect};
  }
  button + button {
    margin-left: 0.5em;
  }
`;
