import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { changePassword } from 'services/user';
import useOutsideClick from 'hooks/useOutsideClick';
import useInput from 'hooks/useInput';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import { ERROR_MESSAGE } from '../login/Form';

export default function ChangePassword() {
  const [severErrorMessage, setServerErrorMessage] = useState('');

  const {
    error: nextPasswordError,
    handleBlur: handleNextPasswordBlur,
    handleChange: handleNextPasswordChange,
    value: nextPassword,
    setError: setNextPasswordError,
    ref: nextPasswordRef,
    setValue: setNextPassword,
  } = useInput('password');
  const {
    error: passwordError,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
    setError: setPasswordError,
    value: password,
    ref: passwordRef,
    setValue: setPassword,
  } = useInput('password');

  const { ref, isVisible, changeVisibility, animationState } =
    useOutsideClick();

  const { mutate } = useMutation(changePassword, {
    onSuccess: (data) => {
      if (!data.success) {
        return setPasswordError(data.message);
      }
      setPassword('');
      setNextPassword('');
      changeVisibility();
    },
    onError: (err: ILoginError) => {
      setNextPassword('');
      setNextPasswordError(' ');
      setServerErrorMessage(err.response?.data.message);
    },
  });

  const checkEmptyValue = () => {
    if (!password) setPasswordError(ERROR_MESSAGE.empty);
    if (!nextPassword) setNextPasswordError(ERROR_MESSAGE.empty);

    return !password || !nextPassword;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = checkEmptyValue();
    const isError = passwordError || nextPasswordError;
    if (isEmpty || isError) return;
    if (password === nextPassword)
      return setNextPasswordError('비밀번호가 같습니다');
    mutate({ password, nextPassword });
  };

  useEffect(() => {
    if (severErrorMessage && nextPassword) setServerErrorMessage('');
  }, [severErrorMessage, nextPassword]);

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
        <p>{severErrorMessage}</p>
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
