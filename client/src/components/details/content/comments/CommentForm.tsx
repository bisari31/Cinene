import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useLoginPortal } from 'hooks/cinene';
import { createComment } from 'services/comments';
import { authUserState, contentIdState } from 'atom/atom';
import { buttonEffect } from 'styles/css';
import { cineneKeys } from 'utils/queryOptions';

interface Props {
  responseId?: string;
}

export default function CommentForm({ responseId }: Props) {
  const contentId = useRecoilValue(contentIdState);
  const [comment, setComment] = useState('');
  const [auth, setAuth] = useRecoilState(authUserState);
  const queryClient = useQueryClient();

  const { openModal, renderPortal } = useLoginPortal();

  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(cineneKeys.comments(contentId));
      setComment('');
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    if (!auth) {
      openModal();
    } else {
      mutate({
        comment,
        contentId,
        responseTo: responseId,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <CommentFormWrapper onSubmit={handleSubmit} color="navy50">
      <textarea
        readOnly={!auth}
        placeholder={auth ? '댓글을 입력해 주세요' : '로그인이 필요합니다'}
        value={comment}
        onChange={handleChange}
      />
      <button type="submit">등록</button>
      {renderPortal()}
    </CommentFormWrapper>
  );
}

const CommentFormWrapper = styled.form`
  ${({ theme }) => css`
    display: flex;
    margin: 2em 0;
    textarea {
      resize: none;
      flex: 1;
      padding: 1em 1.5em;
      overflow-y: hidden;
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
