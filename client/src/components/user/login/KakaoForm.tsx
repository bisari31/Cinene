import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { useInput } from 'hooks/cinene';
import { useFocus } from 'hooks';

import Input from 'components/common/Input';

export default function KakaoForm({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const {
    error: nicknameError,
    handleBlur: handleNicknameBlur,
    handleChange: handleNicknameChange,
    ref: nicknameRef,
    value: nickname,
    setError: setNicknameError,
  } = useInput('nickname', undefined, location.state.nickname);
  const focus = useFocus(nicknameRef);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const join = await axios.post('/users/kakao-register', { nickname });
  };

  useEffect(() => {
    focus.start();
  }, [focus]);

  return (
    <KakaoFormWrapper onSubmit={handleSubmit}>
      <Input
        value={location.state?.email}
        type="email"
        isDisabled
        label="이메일"
      />
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
      {children}
    </KakaoFormWrapper>
  );
}

const KakaoFormWrapper = styled.form`
  & > div:last-child {
  }
`;
