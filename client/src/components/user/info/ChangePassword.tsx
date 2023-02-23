import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { changePassword } from 'services/user';
import useOutsideClick from 'hooks/useOutsideClick';
import useInputTes from 'hooks/useInputTes';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import { checkEmptyValue, getFocus } from 'utils/login';

export default function ChangePassword() {
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const {
    error: passwordError,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
    setError: setPasswordError,
    value: password,
    ref: passwordRef,
    setValue: setPassword,
  } = useInputTes('password');
  const {
    error: nextPasswordError,
    handleBlur: handleNextPasswordBlur,
    handleChange: handleNextPasswordChange,
    value: nextPassword,
    setError: setNextPasswordError,
    ref: nextPasswordRef,
    setValue: setNextPassword,
  } = useInputTes('password');

  const { ref, isVisible, changeVisibility, animationState } =
    useOutsideClick();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(changePassword, {
    onSuccess: (data) => {
      if (!data.success) {
        setPasswordError(data.message);
        return passwordRef.current?.focus();
      }
      setPassword('');
      setNextPassword('');
      changeVisibility();
      // queryClient.invalidateQueries(['auth']);
    },
    onError: (err: ILoginError) => {
      setNextPassword('');
      setNextPasswordError(' ');
      setFetchErrorMessage(err.response?.data.message);
    },
  });
  const inputObj: IObject[] = [
    {
      value: password,
      setError: setPasswordError,
      error: passwordError,
      ref: passwordRef,
    },
    {
      value: nextPassword,
      setError: setNextPasswordError,
      error: nextPasswordError,
      ref: nextPasswordRef,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkEmptyValue(inputObj);
    if (password === nextPassword) {
      setNextPasswordError('비밀번호가 같습니다');
      return nextPasswordRef.current?.focus();
    }
    const isError = getFocus(inputObj);
    if (isError) return;
    mutate({ password, nextPassword });
  };

  useEffect(() => {
    if (fetchErrorMessage && nextPassword) setFetchErrorMessage('');
  }, [fetchErrorMessage, nextPassword]);

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <Input
          ref={passwordRef}
          label="기존 비밀번호"
          type="password"
          placeholder="영문,숫자 포함 8~16자"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordError}
          onBlur={handlePasswordBlur}
        />
        <Input
          ref={nextPasswordRef}
          label="변경 비밀번호"
          type="password"
          placeholder="영문,숫자 포함 8~16자"
          value={nextPassword}
          onChange={handleNextPasswordChange}
          errorMessage={nextPasswordError}
          onBlur={handleNextPasswordBlur}
        />
        <p>{fetchErrorMessage}</p>
        <Button color="pink" size="fullWidth" type="submit">
          비밀번호 변경
        </Button>
      </form>
      {isVisible && (
        <Portal>
          <Modal
            ref={ref}
            isVisible={animationState}
            buttonText={['확인']}
            color="pink"
            executeFn={changeVisibility}
          >
            비밀번호 변경 완료
          </Modal>
        </Portal>
      )}
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
