import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { changePassword } from 'services/user';
import { authUserState } from 'atom/atom';
import { useInput, useLoginPortal } from 'hooks/cinene';

import Button from 'components/common/Button';
import Input from 'components/common/Input';

export default function ChangePassword() {
  const setAuth = useSetRecoilState(authUserState);
  const password = useInput('password');
  const { openPortal, renderPortal } = useLoginPortal();
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      openPortal('비밀번호 변경 성공');
      password.setValue('');
      password.ref.current?.blur();
    },
    onError: ({ response }: AxiosError) => {
      if (response.status === 401) {
        openPortal();
        setAuth(null);
      } else {
        password.setError('비밀번호 변경 실패');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.error) return;
    if (!password.value) {
      password.setError('비밀번호를 입력해 주세요');
      return;
    }
    mutate(password.value);
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <Input
          ref={password.ref}
          label="변경 비밀번호"
          type="password"
          placeholder="영문,숫자 포함 8~16자"
          value={password.value}
          onChange={password.handleChange}
          errorMessage={password.error}
          onBlur={password.handleBlur}
        />
        <Button color="pink" size="fullWidth" type="submit">
          비밀번호 변경
        </Button>
      </form>
      {renderPortal()}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;

  form > p {
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.8rem;
    font-weight: 300;
    height: 12.9px;
    text-align: center;
  }
  Button {
    margin-top: 3em;
  }
`;
