import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { useAuthQuery } from 'hooks/useAuthQuery';
import { createComment } from 'services/comments';
import { contentIdState } from 'atom/atom';
import { buttonEffect } from 'styles/css';

interface IProps {
  responseId?: string;
}

export default function CommentForm({ responseId }: IProps) {
  const [text, setText] = useState('');

  const client = useQueryClient();
  const contentId = useRecoilValue(contentIdState);

  const { data } = useAuthQuery();

  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      client.invalidateQueries(['comments']);
      setText('');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.success || !text) return;
    mutate({
      comment: text,
      contentId,
      responseTo: responseId,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <CommentFormWrapper onSubmit={handleSubmit} color="navy50">
      <textarea
        readOnly={!data?.success}
        placeholder={
          data?.success ? '댓글을 입력해 주세요' : '로그인이 필요합니다'
        }
        value={text}
        onChange={handleChange}
      />
      <button type="submit">등록</button>
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
