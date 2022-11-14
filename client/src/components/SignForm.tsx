import { useRef, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import useInput from 'hooks/useInput';
import { userIdState } from 'atom/user';
import { login, register } from 'services/auth';
import { useMutation } from 'react-query';
import Input from './common/Input';
import Button from './common/Button';

interface ILoginError {
  err: AxiosError<{
    success: boolean;
    message: string;
    type: 'email' | 'password' | 'nickname';
  }>;
}

interface IProps {
  type: 'login' | 'register';
}

export default function SignForm({ type }: IProps) {
  const [email, handleChangeEmail] = useInput();
  const [password, handleChangePassword] = useInput();
  const [confirmPassword, handleChangeConfirmPassword] = useInput();
  const [nickname, handleChangeNickname] = useInput();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [disable, setDisable] = useState(true);

  const setUserId = useSetRecoilState(userIdState);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      setUserId(data.user._id);
      localStorage.setItem('auth', data.user._id);
      navigate(-1);
    },
    onError: (err: ILoginError) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.type === 'email') {
          return setEmailError(err.response.data.message);
        }
        setPasswordError(err.response?.data.message);
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, nickname, password };
    try {
      if (type === 'login') return mutate(body);
      if (password !== confirmPassword)
        return setPasswordError('비밀번호가 다릅니다.');
      await register(body);
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.type === 'email') {
          return setEmailError(err.response.data.message);
        }
        setNicknameError(err.response?.data.message);
      }
    }
  };

  const handleBlurPassword = () => {
    if ((password || confirmPassword) && confirmPassword !== password) {
      setPasswordError('비밀번호가 다릅니다.');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    if (type === 'login') {
      if (email) setEmailError('');
      if (password) setPasswordError('');
    }
    if (type === 'register') {
      if (nickname) setNicknameError('');
    }
  }, [email, password, type, nickname]);

  useEffect(() => {
    if (
      !email.length ||
      emailError ||
      passwordError ||
      !confirmPassword.length ||
      !nickname.length ||
      nicknameError
    )
      return setDisable(true);
    setDisable(false);
  }, [
    emailError,
    passwordError,
    nicknameError,
    email,
    nickname,
    confirmPassword,
  ]);

  return (
    <SignFormWrapper>
      <form action="" onSubmit={onSubmit}>
        <Input
          errorMessage={emailError}
          label="이메일"
          value={email}
          onChange={handleChangeEmail}
          type="text"
          refElement={inputRef}
        />

        {type === 'register' && (
          <Input
            label="닉네임"
            errorMessage={nicknameError}
            value={nickname}
            onChange={handleChangeNickname}
            type="text"
          />
        )}
        <Input
          errorMessage={passwordError}
          label="비밀번호"
          onBlur={handleBlurPassword}
          value={password}
          onChange={handleChangePassword}
          type="password"
        />
        {type === 'register' && (
          <Input
            label="비밀번호 확인"
            onBlur={handleBlurPassword}
            errorMessage={passwordError}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            type="password"
          />
        )}
        <ButtonWrapper>
          <Button
            color="black"
            size="fullWidth"
            type="submit"
            disable={disable}
          >
            {type === 'login' ? '로그인' : '회원가입'}
          </Button>
          {type === 'login' && (
            <Button color="yellow" size="fullWidth" type="button">
              카카오톡 로그인
            </Button>
          )}
        </ButtonWrapper>
      </form>
    </SignFormWrapper>
  );
}

const SignFormWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    height: ${`calc(100vh -  ${theme.config.header} - ${theme.config.main_margin_top})`};
    justify-content: center;
    form {
      flex: 1;
      max-width: 400px;
    }
  `}
`;
const ButtonWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 8em;
  }
  & > button:nth-child(2) {
    margin-top: 2em;
  }
`;
