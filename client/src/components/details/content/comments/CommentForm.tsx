import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { useAuth, useLoginPortal, useMutationOptions } from 'hooks/cinene';
import { useResizeHeight } from 'hooks';
import { createComment } from 'services/comments';
import { contentIdState } from 'atom/atom';
import { buttonEffect } from 'styles/css';
import { cineneKeys } from 'utils/queryOptions';

interface Props {
  responseId?: string;
}

export default function CommentForm({ responseId }: Props) {
  const contentId = useRecoilValue(contentIdState);
  const [comment, setComment] = useState('');
  const { auth } = useAuth();
  const { openPortal, renderPortal } = useLoginPortal();
  const { errorHandler, queryClient } = useMutationOptions(openPortal);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { resetHeight, setScrollHeight } = useResizeHeight(textareaRef);

  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(cineneKeys.comments(contentId));
      setComment('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    },
    onError: (err: AxiosError) => errorHandler(err),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    if (!auth) {
      openPortal();
      return;
    }
    mutate({
      comment,
      contentId,
      responseTo: responseId,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    resetHeight();
    setScrollHeight();
  };

  return (
    <StyledForm onSubmit={handleSubmit} color="navy50">
      <textarea
        rows={1}
        ref={textareaRef}
        readOnly={!auth}
        placeholder={auth ? '댓글을 입력해 주세요' : '로그인이 필요합니다'}
        value={comment}
        onChange={handleChange}
      />
      <button type="submit">등록</button>
      {renderPortal()}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    margin: 2em 0;
    textarea {
      height: 20px;
      line-height: 20px;
      overflow-y: hidden;
      padding: 10px 16px;
      resize: none;
      width: 100%;
      &::placeholder {
        font-size: 95%;
      }
    }
    button {
      margin-left: 3em;
      width: 100px;
      ${buttonEffect};
    }
    button,
    textarea {
      background-color: ${theme.colors.navy50};
      border: none;
      border-radius: 10px;
      color: #fff;
      height: 40px;
    }
  `}
`;
