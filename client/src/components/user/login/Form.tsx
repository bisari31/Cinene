import { ReactNode, useEffect, useState } from 'react';

import { useInput } from 'hooks/cinene';
import { useMutation } from 'react-query';
import { login, register } from 'services/user';
import { useFocus } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authUserState } from 'atom/atom';

import Input from 'components/common/Input';

export const EMPTY_ERROR_MESSAGE = '필수 입력 항목입니다.';

interface Props {
  isLogin: boolean;
  children: ReactNode;
}

export default function Form({ children, isLogin }: Props) {
  const password = useInput('password');
  const confirmPassword = useInput('password', '', password.value);
  const nickname = useInput('nickname');
  const email = useInput('email');
  const [message, setMessage] = useState('');
  const focus = useFocus(email.ref);
  const navigate = useNavigate();
  const setAuthUser = useSetRecoilState(authUserState);

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: ({ accessToken, user }) => {
      setAuthUser(user);
      localStorage.setItem('accessToken', accessToken);
      navigate('/');
    },
    onError: (err: AxiosError) => {
      const { data, status } = err.response;
      if (status === 404) {
        password.setValue('');
        email.setValue('');
        focus.start();
      } else {
        password.setError(' ');
        password.setValue('');
      }
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

  const checkEmptyValue = () => {
    const values = [
      email.value,
      password.value,
      nickname.value,
      confirmPassword.value,
    ];
    const setErrors = [
      email.setError,
      password.setError,
      nickname.setError,
      confirmPassword.setError,
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
      email.error || password.error || nickname.error || confirmPassword.error;
    if (isEmpty || isError) return;
    if (!isLogin && password.value !== confirmPassword.value) {
      confirmPassword.setError('비밀번호가 일치하지 않습니다.');
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
    if (password.value && message) {
      setMessage('');
    }
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
          errorMessage={confirmPassword.error}
          label="비밀번호 확인"
          placeholder="영문,숫자 포함 8~16자"
          value={confirmPassword.value}
          onChange={confirmPassword.handleChange}
          type="password"
          onBlur={confirmPassword.handleBlur}
          ref={confirmPassword.ref}
        />
      )}
      <p>{message}</p>
      {children}
    </form>
  );
}
