import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import useInput from 'hooks/useInput';
import { userIdState } from 'atom/atom';
import { login, register } from 'services/auth';

import Input from './common/Input';
import Button from './common/Button';
import ConfirmPassword from './common/ConfirmPassword';

export default function SignForm({ type }: { type: 'login' | 'register' }) {
  const {
    input: email,
    handleChange: handleChangeEmail,
    errorMsg: emailError,
    setErrorMsg: setEmailError,
  } = useInput('email');
  const {
    input: password,
    handleChange: handleChangePassword,
    errorMsg: passwordError,
    setErrorMsg: setPasswordError,
  } = useInput('password');
  const {
    input: nickname,
    handleChange: handleChangeNickname,
    errorMsg: nicknameError,
    setErrorMsg: setNicknameError,
  } = useInput('nickname');

  const [signupError, setSignupError] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

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
    onError: (err: ILoginError) => {
      if (err.response.data.type === 'email') {
        return setEmailError(err.response.data.message);
      }
      setPasswordError(err.response.data.message);
    },
  });

  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: () => navigate('/login'),
    onError: (err: ILoginError) => {
      if (err.response?.data.type === 'email')
        return setEmailError(err.response.data.message);
      setNicknameError(err.response?.data.message);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, nickname, password };
    if (type === 'login') return loginMutate(body);
    registerMutate(body);
  };

  useEffect(() => {
    if (type === 'login') {
      if (password && email && !emailError && !passwordError)
        return setIsDisabled(false);
      setIsDisabled(true);
    }
  }, [password, email, type, emailError, passwordError]);

  useEffect(() => {
    if (type === 'register') {
      if (
        nickname &&
        email &&
        !emailError &&
        !nicknameError &&
        !signupError &&
        !passwordError
      )
        return setIsDisabled(false);
      setIsDisabled(true);
    }
  }, [
    email,
    signupError,
    type,
    nickname,
    emailError,
    nicknameError,
    passwordError,
  ]);

  return (
    <Form onSubmit={onSubmit}>
      <Input
        errorMessage={emailError}
        placeholder="이메일 주소"
        label="이메일"
        value={email}
        onChange={handleChangeEmail}
        type="text"
        refElement={inputRef}
      />

      {type === 'register' && (
        <Input
          label="닉네임"
          placeholder="특수문자 제외 2~10자"
          errorMessage={nicknameError}
          value={nickname}
          onChange={handleChangeNickname}
          type="text"
        />
      )}
      {type === 'login' ? (
        <Input
          errorMessage={passwordError}
          label="비밀번호"
          placeholder="영문,숫자 포함 8~16자"
          value={password}
          onChange={handleChangePassword}
          type="password"
        />
      ) : (
        <ConfirmPassword
          placeholder="영문,숫자 포함 8~16자"
          setReturnError={setSignupError}
          errorMessage={passwordError}
          type="register"
          password={password}
          onChange={handleChangePassword}
        />
      )}
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
`;

const ButtonWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 3.5em;
  }
  & > button:nth-child(2) {
    margin-top: 1.5em;
  }
`;
