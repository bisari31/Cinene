import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { USER_IMAGE } from 'utils/imageUrls';
import { Button, buttonEffect } from 'styles/css';
import { Heart } from 'assets';
import { deleteComment } from 'services/comments';
import { contentIdState } from 'atom/atom';
import { cineneKeys } from 'utils/queryOptions';
import { useLoginPortal } from 'hooks/cinene';
import { useGetRelativeTime } from 'hooks';

import ReplyComments from './ReplyComments';
import useLikeQuery from '../../hooks/useLikeQuery';

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
  const contentId = useRecoilValue(contentIdState);
  const { openModal, renderPortal } = useLoginPortal();
  const { auth, setAuth, data, mutate } = useLikeQuery(
    'comments',
    commentItem?._id,
    openModal,
  );
  const queryClient = useQueryClient();
  const { mutate: deleteCommentMutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(cineneKeys.comments(contentId));
    },
    onError: ({ response }: AxiosError) => {
      if (response.status === 401) {
        setAuth(null);
        openModal();
      } else {
        openModal(`${response.data.message} 😭`);
      }
    },
  });

  const handleLikeButton = () => {
    if (!auth) {
      openModal();
      return;
    }
    mutate({ type: 'comment', id: commentItem?._id });
  };

  const handleCommentEdit = () => {
    console.log(commentItem?._id);
  };

  const handleCommentDelete = () => {
    deleteCommentMutate(commentItem?._id);
  };

  const getReplyComments = () =>
    comments?.filter((comment) => comment.responseTo === commentItem?._id);
  const replyComments = getReplyComments();

  return (
    <>
      <Item key={commentItem?._id} isResponse={isResponse}>
        <img src={commentItem?.author.img || USER_IMAGE} alt="user_poster" />
        <Content date={useGetRelativeTime(commentItem?.createdAt)}>
          <div>
            <p>{commentItem?.author.nickname}</p>
            {auth?._id === commentItem?.author._id && (
              <>
                <button type="button" onClick={handleCommentEdit}>
                  수정
                </button>
                <button type="button" onClick={handleCommentDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
          <p>{commentItem?.comment}</p>
        </Content>
        <ButtonWrapper color="navy50">
          <Button
            isZero={!data?.likes}
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
        </ButtonWrapper>
      </Item>
      {openReplyComment && (
        <ReplyComments comments={replyComments} responseId={commentItem?._id} />
      )}
      {renderPortal()}
    </>
  );
}

export const Item = styled.div<{ isResponse?: boolean }>`
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

export const Content = styled.div<{ date: string }>`
  ${({ theme, date }) => css`
    flex: 1;
    line-height: 1.2;
    word-break: break-all;
    div {
      display: flex;
      align-items: center;
      margin-bottom: 0.3em;
      p {
        font-size: 0.9rem;
        font-weight: 500;
        &::after {
          color: ${theme.colors.gray500};
          content: '${date && date}';
          font-size: 0.8rem;
          margin-left: 0.4em;
          margin-right: 0.7em;
        }
      }
      button {
        padding: 0;
        font-size: 0.78rem;
        height: 15px;
        color: ${theme.colors.gray300};
        background: none;
        border: none;
      }
      button + button {
        margin-left: 0.5em;
      }
    }
    & > p {
      color: ${theme.colors.gray300};
      font-size: 0.9rem;
    }
  `}
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  button {
    ${buttonEffect};
  }
  button + button {
    margin-left: 0.5em;
  }
`;
