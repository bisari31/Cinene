import React, { useState, memo, useRef, useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { contentIdState } from 'atom/atom';
import { useFocus, useGetRelativeTime, useResizeHeight } from 'hooks';
import { useAuth, useMutationOptions } from 'hooks/cinene';
import { deleteComment, editComment } from 'services/comments';
import { cineneKeys } from 'utils/queryOptions';

interface Props {
  commentItem?: Comment;
  openModal: (message?: string) => void;
}

function CommentItemData({ commentItem, openModal }: Props) {
  const [comment, setComment] = useState(commentItem?.comment ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentId = useRecoilValue(contentIdState);
  const { auth } = useAuth();
  const { queryClient, errorHandler } = useMutationOptions(openModal);
  const { focusToEnd } = useFocus(textareaRef);
  const { resetHeight, setScrollHeight } = useResizeHeight(textareaRef);
  const { mutate: deleteCommentMutate } = useMutation(deleteComment, {
    onSuccess: () =>
      queryClient.invalidateQueries(cineneKeys.comments(contentId)),
    onError: (error: AxiosError) => errorHandler(error),
  });

  const { mutate: editCommentMutate } = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(cineneKeys.comments(contentId));
    },
    onError: (error: AxiosError) => errorHandler(error),
    onSettled: () => setIsEditing(false),
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (textareaRef.current) {
      resetHeight();
      setScrollHeight();
    }
  };

  const handleCommentEdit = () => {
    if (isEditing) {
      if (!comment.trim()) {
        setIsEditing(false);
        setComment(commentItem?.comment ?? '');
        return;
      }
      editCommentMutate({ id: commentItem?._id, comment });
    }
    setIsEditing(true);
  };

  const handleCommentDelete = () =>
    isEditing ? setIsEditing(false) : deleteCommentMutate(commentItem?._id);

  const replaceComment = useMemo(
    () => commentItem?.comment.replace('/\n/g', '<br/>'),
    [commentItem],
  );

  useEffect(() => {
    if (isEditing) {
      setScrollHeight();
      focusToEnd();
    }
  }, [isEditing, setScrollHeight, focusToEnd]);

  return (
    <StyledItem
      date={useGetRelativeTime(commentItem?.createdAt, commentItem?.updatedAt)}
    >
      <div>
        <p>{commentItem?.author.nickname}</p>
        {auth?._id === commentItem?.author._id && (
          <>
            <button type="button" onClick={handleCommentEdit}>
              {isEditing ? '완료' : '수정'}
            </button>
            <button type="button" onClick={handleCommentDelete}>
              {isEditing ? '취소' : '삭제'}
            </button>
          </>
        )}
      </div>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          rows={1}
          value={comment}
          onChange={handleCommentChange}
        >
          {commentItem?.comment}
        </textarea>
      ) : (
        <p>{replaceComment}</p>
      )}
    </StyledItem>
  );
}

export default memo(CommentItemData);

export const StyledItem = styled.div<{ date: string }>`
  ${({ theme, date }) => css`
    flex: 1;
    line-height: 1.2;
    div {
      align-items: center;
      display: flex;
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
        background: none;
        border: none;
        color: ${theme.colors.gray300};
        font-size: 0.78rem;
        height: 15px;
        padding: 0;
      }
      button + button {
        margin-left: 0.5em;
      }
    }
    & > p {
      white-space: pre-line;
      color: ${theme.colors.gray300};
      font-size: 0.9rem;
    }

    textarea {
      background-color: #3c3e4a;
      border: none;
      border-radius: 8px;
      color: #fff;
      margin-top: 5px;
      overflow-y: hidden;
      padding: 10px;
      resize: none;
      width: 95%;
    }
  `}
`;
