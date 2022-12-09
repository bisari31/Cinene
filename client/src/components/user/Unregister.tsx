import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { checkPassword, deleteUser } from 'services/auth';
import useInput from 'hooks/useInput';
import useOutsideClick from 'hooks/useOutsideClick';
import { userIdState } from 'atom/user';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

export default function Unregister() {
  const setUserId = useSetRecoilState(userIdState);
  const { input: password, handleChange } = useInput();
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const { ref, changeVisibility, isVisible, animationState } =
    useOutsideClick(300);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await checkPassword({ password });
      changeVisibility();
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

  useEffect(() => {
    setIsDisabled(!!errorMsg.length || !password.length);
  }, [errorMsg, password]);

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
          isDisabled={isDisabled}
          type="submit"
          color="black"
          size="fullWidth"
        >
          회원 탈퇴
        </Button>
      </form>
      {isVisible && (
        <Portal>
          <Modal
            refElement={ref}
            isVisible={animationState}
            buttonText={['아니요', '네']}
            closeFn={changeVisibility}
            executeFn={handleClick}
            color="black"
          >
            정말 탈퇴하시겠습니까? 😭
          </Modal>
        </Portal>
      )}
    </UnregisterWrapper>
  );
}

const UnregisterWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  form {
    width: 100%;
  }
  button {
    margin-top: 8em;
  }
`;
