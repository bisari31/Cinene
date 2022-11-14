import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { checkPassword, deleteUser } from 'services/auth';
import useInput from 'hooks/useInput';
import useCheckedOutSide from 'hooks/useCheckedOutSide';
import { userIdState } from 'atom/user';

import Button from 'components/common/Button';
import Modal from 'components/common/Portal';
import Input from 'components/common/Input';

export default function Unregister() {
  const setUserId = useSetRecoilState(userIdState);
  const [password, handleChange] = useInput();
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const { ref, changeVisible, isVisible, animationState } =
    useCheckedOutSide(300);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await checkPassword({ password });
      changeVisible();
    } catch (err) {
      if (axios.isAxiosError(err)) setErrorMsg(err.response?.data.message);
    }
  };

  const handleClick = () => {
    deleteUser().then(() => {
      setUserId('');
      localStorage.removeItem('auth');
      navigate('/');
    });
  };

  useEffect(() => {
    setErrorMsg('');
  }, [password]);

  return (
    <UnregisterWrapper>
      <form action="" onSubmit={handleSubmit}>
        <Input
          errorMessage={errorMsg}
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={handleChange}
        />
        <Button
          disable={!password.length || !!errorMsg}
          type="submit"
          color="black"
          size="large"
        >
          회원 탈퇴
        </Button>
      </form>
      {isVisible && (
        <Modal
          refElement={ref}
          isVisible={animationState}
          buttonText={['아니요', '네']}
          closeFn={changeVisible}
          executeFn={handleClick}
          color="black"
        >
          정말 탈퇴하시겠습니까? 😭
        </Modal>
      )}
    </UnregisterWrapper>
  );
}

const UnregisterWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    margin-top: 8em;
  }
`;