import { useRef, useState, useCallback, ReactNode } from 'react';
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
  const [
    email,
    emailErrorMessage,
    setEmailError,
    handleEmailChange,
    handleEmailValidation,
  ] = useInputTes('email');
  const [
    password,
    passwordErrorMessage,
    setPasswordError,
    handlePasswordChange,
    handlePasswordValidation,
  ] = useInputTes('password');
  const [
    confirmPassword,
    confirmPasswordErrorMessage,
    setConfirmPasswordError,
    handleConfirmPasswordChange,
    handleConfirmPasswordValidation,
  ] = useInputTes('password');
  const [
    nickname,
    nicknameErrorMessage,
    setNicknameErrore,
    handleNicknameChange,
    handleNicknameValidation,
  ] = useInputTes('nickname');

  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

  const isLogin = type === 'login';

  const setUserId = useSetRecoilState(userIdState);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: (data) => {
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
    onSuccess: () => navigate('/login'),
    onError: ({ response }: ILoginError) => {
      setFetchErrorMessage(response.data.message);
    },
  });

  const checkEmptyValue = () => {
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!isLogin) {
      if (!nickname) setNicknameErrore(true);
      if (!confirmPassword) setConfirmPasswordError(true);
    }

    return isLogin
      ? !email || !password
      : !email || !password || !nickname || !confirmPassword;
  };

  const matchPassword = useCallback(() => {
    if (password !== confirmPassword) {
      setFetchErrorMessage('패스워드가 일치하지 않습니다.');
      return false;
    }
    return true;
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchErrorMessage('');
    const isEmpty = checkEmptyValue();
    if (
      isEmpty ||
      emailErrorMessage ||
      passwordErrorMessage ||
      nicknameErrorMessage
    )
      return;
    if (!isLogin) {
      const isMatched = matchPassword();
      if (!isMatched) return;
    }
    const body = { email, nickname, password };
    if (isLogin) return loginMutate(body);
    registerMutate(body);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        onBlur={handleEmailValidation}
        placeholder="이메일 주소"
        label="이메일"
        value={email}
        onChange={handleEmailChange}
        type="text"
        ref={inputRef}
        errorMessage={emailErrorMessage}
      />
      {!isLogin && (
        <Input
          label="닉네임"
          placeholder="특수문자 제외 2~10자"
          errorMessage={nicknameErrorMessage}
          value={nickname}
          onChange={handleNicknameChange}
          onBlur={handleNicknameValidation}
          type="text"
        />
      )}
      <Input
        errorMessage={passwordErrorMessage}
        label="비밀번호"
        placeholder="영문,숫자 포함 8~16자"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        onBlur={handlePasswordValidation}
      />
      {!isLogin && (
        <Input
          errorMessage={confirmPasswordErrorMessage}
          label="비밀번호 확인"
          placeholder="영문,숫자 포함 8~16자"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          onBlur={handleConfirmPasswordValidation}
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
