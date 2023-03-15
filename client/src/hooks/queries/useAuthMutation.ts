import { useState } from 'react';
import { accessTokenState } from 'atom/atom';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { login, register } from 'services/user';

export default function useAuthMutation(
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>,
  setEmailError: React.Dispatch<React.SetStateAction<string>>,
  setNicknameError: React.Dispatch<React.SetStateAction<string>>,
  emailRef: React.RefObject<HTMLInputElement>,
) {
  const [message, setMessage] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setAccessToken = useSetRecoilState(accessTokenState);

  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: ({ accessToken }) => {
      if (accessToken) {
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
        queryClient.invalidateQueries(['auth']);
        navigate('/');
      }
    },
    onError: (err: IAxiosError) => {
      const { data, status } = err.response;
      if (status === 404) {
        setPassword('');
        setEmail('');
        emailRef.current?.focus();
      } else {
        setPasswordError(' ');
        setPassword('');
      }
      setMessage(data.message ?? '');
    },
  });

  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: () => navigate('/login'),
    onError: (
      err: IAxiosError<{
        hasNickname?: boolean;
        hasEmail?: boolean;
      }>,
    ) => {
      const { status, data } = err.response;
      if (status === 409) {
        if (data.hasEmail) setEmailError('가입된 이메일이 이미 있습니다.');
        if (data.hasNickname)
          setNicknameError('가입된 닉네임이 이미 있습니다.');
      } else {
        setMessage(data.message ?? '');
      }
    },
  });

  return { loginMutate, registerMutate, message, setMessage };
}
