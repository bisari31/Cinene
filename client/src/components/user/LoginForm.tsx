import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import useInput from 'hooks/useInput';
import { userIdState } from 'atom/atom';
import { login, register } from 'services/user';
import { regexObj } from 'utils/regex';

import useInputTes from 'hooks/useInputTes';
import Input from '../common/Input';
import Button from '../common/Button';
import ConfirmPassword from '../common/ConfirmPassword';

type PathName = 'login' | 'register';

export default function LoginForm({ type }: { type: PathName }) {
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
    nickname,
    nicknameErrorMessage,
    setNicknameErrore,
    handleNicknameChange,
    handleNicknameValidation,
  ] = useInputTes('nickname');

  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

  const [signupError, setSignupError] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const setUserId = useSetRecoilState(userIdState);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: (data) => {
      setUserId(data.user._id);
      localStorage.setItem('userId', data.user._id);
      queryClient.invalidateQueries(['auth']);
      // localStorage.setItem('token', data.user.token);
      navigate('/');
    },
    onError: ({ response }: ILoginError) => {
      setFetchErrorMessage(response.data.message);
      // if (err.response.data.type === 'email') {
      //   return setEmailError(err.response.data.message);
      // }
      // setPasswordError(err.response.data.message);
    },
  });

  // const { mutate: registerMutate } = useMutation(register, {
  //   onSuccess: () => navigate('/login'),
  //   onError: (err: ILoginError) => {
  //     if (err.response?.data.type === 'email')
  //       return setEmailError(err.response.data.message);
  //     setNicknameError(err.response?.data.message);
  //   },
  // });
  const checkEmptyValue = () => {
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);

    return !email || !password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchErrorMessage('');
    const isEmpty = checkEmptyValue();
    if (isEmpty || emailErrorMessage || passwordErrorMessage) return;
    const body = { email, nickname, password };
    if (type === 'login') return loginMutate(body);
    // registerMutate(body);
  };

  // useEffect(() => {
  //   setIsDisabled(!!emailErrorMessage || !!passwordErrorMessage);
  // }, [emailErrorMessage, passwordErrorMessage]);

  // useEffect(() => {
  //   if (type === 'login') {
  //     if (password && email && !emailError && !passwordError)
  //       return setIsDisabled(false);
  //     setIsDisabled(true);
  //   }
  // }, [password, email, type, emailError, passwordError]);

  // useEffect(() => {
  //   if (type === 'register') {
  //     if (
  //       nickname &&
  //       email &&
  //       !emailError &&
  //       !nicknameError &&
  //       !signupError &&
  //       !passwordError
  //     )
  //       return setIsDisabled(false);
  //     setIsDisabled(true);
  //   }
  // }, [
  //   email,
  //   signupError,
  //   type,
  //   nickname,
  //   emailError,
  //   nicknameError,
  //   passwordError,
  // ]);

  return (
    <Form onSubmit={handleSubmit}>
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

      {type === 'login' ? (
        <Input
          errorMessage={passwordErrorMessage}
          label="비밀번호"
          placeholder="영문,숫자 포함 8~16자"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          onBlur={handlePasswordValidation}
        />
      ) : (
        <>
          <Input
            label="닉네임"
            placeholder="특수문자 제외 2~10자"
            errorMessage={nicknameErrorMessage}
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameValidation}
            type="text"
          />
          <ConfirmPassword
            placeholder="영문,숫자 포함 8~16자"
            setReturnError={setSignupError}
            errorMessage={passwordErrorMessage}
            type="register"
            password={password}
            onChange={handlePasswordChange}
          />
        </>
      )}
      <p>{fetchErrorMessage}</p>
      <ButtonWrapper>
        <Button
          color="pink"
          size="fullWidth"
          type="submit"
          isDisabled={isDisabled}
        >
          {type === 'login' ? '로그인' : '회원가입'}
        </Button>
        {type === 'login' && (
          <Button
            color="yellow"
            size="fullWidth"
            type="button"
            fontColor="black"
          >
            카카오톡 로그인
          </Button>
        )}
      </ButtonWrapper>
    </Form>
  );
}

const Form = styled.form`
  padding: 3em;

  & > p {
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.8rem;
    font-weight: 300;
    height: 12.9px;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 3.5em;
  }
  & > button:nth-child(2) {
    margin-top: 1.5em;
  }
`;
