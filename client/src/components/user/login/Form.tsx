import { useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import { userIdState } from 'atom/atom';
import { login, register } from 'services/user';
import useInputTes from 'hooks/useInputTes';

import { PathName } from 'pages/LoginPage';
import Input from 'components/common/Input';

export default function Form({
  type,
  children,
}: {
  type: PathName;
  children: ReactNode;
}) {
  const {
    error: emailError,
    value: email,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
    ref: emailRef,
    setError: setEmailError,
  } = useInputTes('email');
  const {
    error: passwordError,
    handleBlur: handlePasswordBlur,
    value: password,
    ref: passwordRef,
    handleChange: handlePasswordChange,
    setError: setPasswordError,
    setValue: setPassword,
  } = useInputTes('password');
  const {
    error: confirmPasswordError,
    handleBlur: handleConfirmPasswordBlur,
    handleChange: handleConfirmPasswordChange,
    ref: confirmPasswordRef,
    value: confirmPassword,
    setError: setConfirmPasswordError,
  } = useInputTes('password', password);
  const {
    error: nicknameError,
    handleBlur: handleNicknameBlur,
    handleChange: handleNicknameChange,
    ref: nicknameRef,
    value: nickname,
    setError: setNicknameError,
  } = useInputTes('nickname');

  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

  const isLogin = type === 'login';

  const setUserId = useSetRecoilState(userIdState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: (data) => {
      if (!data.success) {
        setFetchErrorMessage(data.message);
        setPasswordError(' ');
        setPassword('');
        return passwordRef.current?.focus();
      }
      setUserId(data.user._id);
      localStorage.setItem('userId', data.user._id);
      queryClient.invalidateQueries(['auth']);
      navigate('/');
    },
    onError: ({ response }: ILoginError) => {
      setFetchErrorMessage(response.data.message);
    },
  });

  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: (data) => {
      if (!data.success) {
        if (data.type === 'email') setEmailError(data.message);
        if (data.type === 'nickname') setNicknameError(data.message);
        return getFocus();
      }
      navigate('/login');
    },

    onError: ({ response }: ILoginError) => {
      setFetchErrorMessage(response.data.message);
    },
  });

  const getFocus = () => {
    const refs = [emailRef, nicknameRef, passwordRef, confirmPasswordRef];
    let index = 0;

    if (emailError) index = 0;
    else if (nicknameError) index = 1;
    else if (passwordError) index = 2;
    else if (confirmPasswordError) index = 3;

    refs[index].current?.focus();
  };

  const checkEmptyValue = () => {
    const message = '필수 입력 항목입니다.';
    if (!email) setEmailError(message);
    if (!password) setPasswordError(message);
    if (!isLogin) {
      if (!nickname) setNicknameError(message);
      if (!confirmPassword) setConfirmPasswordError(message);
    }

    return isLogin
      ? !email || !password
      : !email || !password || !nickname || !confirmPassword;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = checkEmptyValue();
    if (
      isEmpty ||
      emailError ||
      passwordError ||
      nicknameError ||
      confirmPasswordError
    )
      return getFocus();
    if (!isLogin && password !== confirmPassword) {
      return setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
    const body = { email, nickname, password };
    if (isLogin) return loginMutate(body);
    registerMutate(body);
  };

  useEffect(() => {
    if (password && fetchErrorMessage) {
      setFetchErrorMessage('');
    }
  }, [password, fetchErrorMessage]);

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
      <p>{fetchErrorMessage}</p>
      {children}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  padding: 3em;

  & > p {
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.8rem;
    font-weight: 300;
    height: 12.9px;
    text-align: center;
  }
`;
