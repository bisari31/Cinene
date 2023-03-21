import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { createComment } from 'services/comments';
import { authUserState, contentIdState } from 'atom/atom';
import { buttonEffect } from 'styles/css';
import { cineneKeys } from 'utils/keys';

import withLoginPortal from 'components/hoc/withLoginPortal';

interface Props {
  responseId?: string;
  toggleLoginModal: () => void;
}

function CommentForm({ responseId, toggleLoginModal }: Props) {
  const [text, setText] = useState('');
  const [auth, setAuth] = useRecoilState(authUserState);
  const contentId = useRecoilValue(contentIdState);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(cineneKeys.comments(contentId));
      setText('');
    },
    onError: (err: AxiosError) => {
      if (err.response.status === 401) {
        setAuth(null);
        toggleLoginModal();
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) {
      toggleLoginModal();
      return;
    }
    if (!text) return;
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
        readOnly={!auth}
        placeholder={auth ? '댓글을 입력해 주세요' : '로그인이 필요합니다'}
        value={text}
        onChange={handleChange}
      />
      <button type="submit">등록</button>
    </CommentFormWrapper>
  );
}

export default withLoginPortal<{ responseId?: string }>(CommentForm);

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
