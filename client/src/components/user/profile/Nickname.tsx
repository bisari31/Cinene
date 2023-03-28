import styled from 'styled-components';
import React, { useEffect, useCallback, useState } from 'react';
import { useMutation } from 'react-query';

import { changeNickname } from 'services/user';
import { CheckMark, Edit } from 'assets/index';
import { useInput, useLoginPortal } from 'hooks/cinene';

import Input from 'components/common/Input';

interface Props {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Nickname({ auth, setAuth }: Props) {
  const [isChanged, setIsChanged] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const loginPortal = useLoginPortal();
  const {
    value: nickname,
    handleChange: handleNicknameChange,
    setValue: setNickname,
    ref: inputRef,
    error,
    setError,
  } = useInput('nickname');

  const { mutate } = useMutation(changeNickname, {
    onSuccess: (data) => {
      loginPortal.open('닉네임 변경 완료 🎉');
      setAuth(data.user);
      setIsChanged(true);
    },
    onError: ({ response }: AxiosError<{ message: string }>) => {
      if (response.status === 401) {
        setAuth(null);
        loginPortal.open();
      }
      setError(response.data.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    if (auth?.nickname === nickname) {
      setError('닉네임이 같습니다.');
      return;
    }
    mutate(nickname);
  };

  const handleFocus = useCallback(() => {
    setIsChanging(true);
    setNickname('');
    if (isChanged) setIsChanged(false);
  }, [isChanged, setNickname]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') inputRef.current?.blur();
    },
    [inputRef],
  );

  const handleBlur = useCallback(
    (prevNickname?: string) => {
      if (!isChanged) setNickname(prevNickname ?? '');
      setError('');
      setIsChanging(false);
    },
    [setError, setNickname, isChanged],
  );

  useEffect(() => {
    if (auth) setNickname(auth.nickname);
  }, [auth, setNickname]);

  return (
    <StyledForm
      onSubmit={handleSubmit}
      isEmpty={!nickname.length}
      isError={!!error}
    >
      <Input
        placeholder="특수문자 제외 2~10자"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={() => handleBlur(auth?.nickname)}
        errorMessage={error}
        ref={inputRef}
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
      />
      {isChanging ? <CheckMark className="svg-check-mark" /> : <Edit />}
      {loginPortal.render()}
    </StyledForm>
  );
}

const StyledForm = styled.form<{ isError: boolean; isEmpty: boolean }>`
  display: flex;
  height: 50px;
  justify-content: center;
  max-width: 350px;
  position: relative;
  div {
    align-items: center;
    flex-direction: column;
    input {
      &::placeholder {
        font-size: 1rem;
      }
      cursor: pointer;
      font-size: 23px;
      font-weight: 500;
      height: 100%;
      margin: 0;
      padding: 0 1.5em;
      text-align: center;
      width: 100%;
    }
  }
  .svg-check-mark {
    fill: ${({ theme, isError, isEmpty }) => {
      if (isEmpty || isError) return theme.colors.gray300;
      return theme.colors.blue;
    }};
    stroke: none;
  }
  svg {
    align-items: center;
    background: none;
    border: none;
    display: flex;
    height: 25px;
    pointer-events: none;
    position: absolute;
    right: 1rem;
    stroke: ${({ theme }) => theme.colors.gray300};
    stroke-width: 1.5;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
  }
`;
