import { useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import { userIdState } from 'atom/atom';
import { login, register } from 'services/user';
import { useInput } from 'hooks';

import { PathName } from 'pages/LoginPage';
import Input from 'components/common/Input';

export const ERROR_MESSAGE = {
  email: '가입된 이메일이 이미 있습니다.',
  nickname: '가입된 닉네임이 이미 있습니다.',
  empty: '필수 입력 항목입니다.',
};

export default function Form({
  type,
  children,
}: {
  type: PathName;
  children: ReactNode;
}) {
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
  } = useInput('email');

  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const isLogin = type === 'login';

  const setUserId = useSetRecoilState(userIdState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: (data) => {
      if (!data.success) {
        setServerErrorMessage(data.message);
        setPasswordError(' ');
        return setPassword('');
      }
      setUserId(data.user._id);
      localStorage.setItem('userId', data.user._id);
      queryClient.invalidateQueries(['auth']);
      navigate('/');
    },
    onError: ({ response }: ILoginError) => {
      setServerErrorMessage(response.data.message);
    },
  });

  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: (data) => {
      if (data.success) return navigate('/login');
      if (data.code === 1) return setEmailError(ERROR_MESSAGE.email);
      if (data.code === 2) return setNicknameError(ERROR_MESSAGE.nickname);
      setEmailError(ERROR_MESSAGE.email);
      return setNicknameError(ERROR_MESSAGE.nickname);
    },
    onError: ({ response }: ILoginError) => {
      setServerErrorMessage(response.data.message);
    },
  });

  const checkEmptyValue = () => {
    const values = [email, password, nickname, confirmPassword];
    const setErrors = [
      setEmailError,
      setPasswordError,
      setNicknameError,
      setConfirmPasswordError,
    ];
    const result = values.filter((value, index) => {
      if (index >= (isLogin ? 2 : 4)) return;
      if (!value) setErrors[index](ERROR_MESSAGE.empty);
      return !value.length;
    });
    return !!result.length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasEmptyValue = checkEmptyValue();
    const isError =
      emailError || passwordError || nicknameError || confirmPasswordError;
    if (hasEmptyValue || isError) return;
    if (!isLogin && password !== confirmPassword) {
      return setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }
    const body = { email, nickname, password };
    if (isLogin) return loginMutate(body);
    registerMutate(body);
  };

  useEffect(() => {
    if (password && serverErrorMessage) {
      setServerErrorMessage('');
    }
  }, [password, serverErrorMessage]);

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
      <p>{serverErrorMessage}</p>
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
