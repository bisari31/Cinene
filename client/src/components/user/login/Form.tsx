import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import useLoginMutation from 'components/user/hooks/useLoginMutation';
import { useInput } from 'hooks/cinene';

import Input from 'components/common/Input';

export const EMPTY_ERROR_MESSAGE = '필수 입력 항목입니다.';

interface Props {
  isLogin: boolean;
  children: ReactNode;
}

export default function Form({ children, isLogin }: Props) {
  const {
    error: passwordError,
    handleBlur: handlePasswordBlur,
    value: password,
    ref: passwordRef,
    handleChange: handlePasswordChange,
    setError: setPasswordError,
    setValue: setPassword,
  } = useInput('password');
  const {
    error: confirmPasswordError,
    handleBlur: handleConfirmPasswordBlur,
    handleChange: handleConfirmPasswordChange,
    ref: confirmPasswordRef,
    value: confirmPassword,
    setError: setConfirmPasswordError,
  } = useInput('password', password);
  const {
    error: nicknameError,
    handleBlur: handleNicknameBlur,
    handleChange: handleNicknameChange,
    ref: nicknameRef,
    value: nickname,
    setError: setNicknameError,
  } = useInput('nickname');
  const {
    error: emailError,
    value: email,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
    ref: emailRef,
    setError: setEmailError,
    setValue: setEmail,
  } = useInput('email');

  const { loginMutate, registerMutate, message, setMessage } = useLoginMutation(
    setPassword,
    setEmail,
    setPasswordError,
    setEmailError,
    setNicknameError,
    emailRef,
  );

  const checkEmptyValue = () => {
    const values = [email, password, nickname, confirmPassword];
    const setErrors = [
      setEmailError,
      setPasswordError,
      setNicknameError,
      setConfirmPasswordError,
    ];
    const result = values.filter((value, index) => {
      if (index >= (isLogin ? 2 : 4)) return false;
      if (!value) {
        setErrors[index](EMPTY_ERROR_MESSAGE);
        return true;
      }
      return false;
    }).length;
    return !!result;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = checkEmptyValue();
    const isError =
      emailError || passwordError || nicknameError || confirmPasswordError;
    if (isEmpty || isError) return;
    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
    const body = { email, nickname, password };
    if (isLogin) {
      loginMutate(body);
      return;
    }
    registerMutate(body);
  };

  useEffect(() => {
    if (password && message) {
      setMessage('');
    }
  }, [password, message, setMessage]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        onBlur={handleEmailBlur}
        placeholder="이메일 주소"
        label="이메일"
        value={email}
        onChange={handleEmailChange}
        type="email"
        errorMessage={emailError}
        ref={emailRef}
      />
      {!isLogin && (
        <Input
          label="닉네임"
          placeholder="특수문자 제외 2~10자"
          errorMessage={nicknameError}
          value={nickname}
          onChange={handleNicknameChange}
          onBlur={handleNicknameBlur}
          type="text"
          ref={nicknameRef}
        />
      )}
      <Input
        errorMessage={passwordError}
        label="비밀번호"
        placeholder="영문,숫자 포함 8~16자"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        onBlur={handlePasswordBlur}
        ref={passwordRef}
      />
      {!isLogin && (
        <Input
          errorMessage={confirmPasswordError}
          label="비밀번호 확인"
          placeholder="영문,숫자 포함 8~16자"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          onBlur={handleConfirmPasswordBlur}
          ref={confirmPasswordRef}
        />
      )}
      <p>{message}</p>
      {children}
    </StyledForm>
  );
}

const StyledForm = styled.form``;
