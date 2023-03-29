import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { useInput } from 'hooks/cinene';
import { login, register } from 'services/user';
import { authUserState } from 'atom/atom';

import Input from 'components/common/Input';

export const EMPTY_ERROR_MESSAGE = '필수 입력 항목입니다.';

interface Props {
  isLogin: boolean;
  children: ReactNode;
}

export default function AuthForm({ children, isLogin }: Props) {
  const password = useInput('password');
  const passwordConfirm = useInput('password', '', password.value);
  const nickname = useInput('nickname');
  const email = useInput('email');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const setAuthUser = useSetRecoilState(authUserState);

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: ({ user }) => {
      setAuthUser(user);
      navigate('/');
    },
    onError: (err: AxiosError) => {
      const { data } = err.response;
      password.setError(' ');
      password.setValue('');
      setMessage(data.message ?? '');
    },
  });

  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: () => navigate('/login'),
    onError: (
      err: AxiosError<{
        hasNickname?: boolean;
        hasEmail?: boolean;
      }>,
    ) => {
      const { status, data } = err.response;
      if (status === 409) {
        if (data.hasEmail) email.setError('가입된 이메일이 이미 있습니다.');
        if (data.hasNickname)
          nickname.setError('가입된 닉네임이 이미 있습니다.');
      } else {
        setMessage(data.message ?? '');
      }
    },
  });

  const checkEmptyValue = (...inputs: typeof email[]) =>
    !!inputs.reduce((count, input, index) => {
      if (index >= (isLogin ? 2 : inputs.length)) return count;
      if (!input.value) {
        input.setError(EMPTY_ERROR_MESSAGE);
        return count + 1;
      }
      return count;
    }, 0);

  const checkError = (...inputs: typeof email[]) =>
    inputs.some((input) => input.error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = checkEmptyValue(email, password, nickname, passwordConfirm);
    const isError = checkError(email, password, nickname, passwordConfirm);
    if (isEmpty || isError) return;
    if (!isLogin && password.value !== passwordConfirm.value) {
      passwordConfirm.setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const body = {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    };
    if (isLogin) {
      loginMutate(body);
      return;
    }
    registerMutate(body);
  };

  useEffect(() => {
    if (password.value && message) setMessage('');
  }, [message, setMessage, password.value]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onBlur={email.handleBlur}
        placeholder="이메일 주소"
        label="이메일"
        value={email.value}
        onChange={email.handleChange}
        type="email"
        errorMessage={email.error}
        ref={email.ref}
      />
      {!isLogin && (
        <Input
          label="닉네임"
          placeholder="특수문자 제외 2~10자"
          errorMessage={nickname.error}
          value={nickname.value}
          onChange={nickname.handleChange}
          onBlur={nickname.handleBlur}
          type="text"
          ref={nickname.ref}
        />
      )}
      <Input
        errorMessage={password.error}
        label="비밀번호"
        placeholder="영문,숫자 포함 8~16자"
        value={password.value}
        onChange={password.handleChange}
        type="password"
        onBlur={password.handleBlur}
        ref={password.ref}
      />
      {!isLogin && (
        <Input
          errorMessage={passwordConfirm.error}
          label="비밀번호 확인"
          placeholder="영문,숫자 포함 8~16자"
          value={passwordConfirm.value}
          onChange={passwordConfirm.handleChange}
          type="password"
          onBlur={passwordConfirm.handleBlur}
          ref={passwordConfirm.ref}
        />
      )}
      <p>{message}</p>
      {children}
    </form>
  );
}
