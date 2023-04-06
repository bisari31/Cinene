import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useInput, useLoginPortal } from 'hooks/cinene';
import { useFocus } from 'hooks';

import Input from 'components/common/Input';
import { kakaoRegister } from 'services/user';
import { useMutation } from 'react-query';

type LocationProps = {
  state: { email: string; nickname: string };
};

export default function KakaoForm({ children }: { children: React.ReactNode }) {
  const { state } = useLocation() as LocationProps;
  const email = useRef(state.email);
  const navigate = useNavigate();
  const { openPortal, renderPortal } = useLoginPortal();
  const nickname = useInput('nickname', state.nickname);
  const { focus } = useFocus(nickname.ref);

  const { mutate } = useMutation(kakaoRegister, {
    onSuccess: () => navigate('/login'),
    onError: ({ response }: AxiosError) => {
      if (response.status === 409) {
        nickname.setError('가입된 닉네임이 이미 있습니다.');
      } else {
        openPortal(response.data.message);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.error) {
      focus();
      return;
    }
    mutate({ email: email.current, nickname: nickname.value });
  };

  useEffect(() => {
    focus();
  }, [focus]);

  return (
    <form onSubmit={handleSubmit}>
      <Input value={email.current} type="email" isDisabled label="이메일" />
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
      {children}
      {renderPortal()}
    </form>
  );
}
