import { useState } from 'react';
import { useMutation } from 'react-query';
import styled, { css, ThemeProps } from 'styled-components';

import { createComment } from 'services/comments';
import { buttonEffect } from 'styles/css';
import { useAuthQuery } from 'hooks/useAuthQuery';

import { queryClient } from 'index';

interface IProps {
  contentId?: string;
  responseTo?: string;
}

export default function Form({ contentId, responseTo }: IProps) {
  const [text, setText] = useState('');
  const { data: authData } = useAuthQuery();

  const { mutate } = useMutation(createComment, {
    onSuccess: (data) => {
      console.log(data);
      setText('');
      queryClient.invalidateQueries(['comments', contentId]);
    },
    onError: (error) => console.error(error),
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData?.success) return;
    mutate({ comment: text, contentId, responseTo });
  };

  return (
    <StyledForm isResponse={!!responseTo} onSubmit={handleSubmit}>
      <textarea
        readOnly={!authData?.success}
        placeholder={
          authData?.success ? '댓글을 입력해 주세요' : '로그인이 필요합니다'
        }
        value={text}
        onChange={handleChange}
      />
      <Button color="navy50" type="submit">
        {responseTo ? '답글 등록' : '등록'}
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled.form<{ isResponse: boolean }>`
  ${({ theme, isResponse }) => css`
    display: flex;
    height: 40px;
    margin-left: ${isResponse && '4em'};
    margin-top: ${isResponse && '1em'};
    textarea,
    button {
      background-color: ${theme.colors.navy50};
      border: none;
      border-radius: 7px;
      color: #fff;
      font-size: 0.8rem;
    }
    textarea {
      overflow-y: hidden;
      padding: 1em 1.5em;
      resize: none;
      width: 100%;
      &::placeholder {
        color: ${theme.colors.gray500};
      }
    }

    @media ${theme.device.tablet} {
      button {
        margin-left: 3em;
      }
    }
  `}
`;

const Button = styled.button`
  ${buttonEffect};
  margin-left: 2em;
  max-width: 100px;
  width: 30%;
`;
