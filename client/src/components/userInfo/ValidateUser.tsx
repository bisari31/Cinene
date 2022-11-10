import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { deleteUser } from 'services/auth';
import useInput from 'hooks/useInput';
import useDebounce from 'hooks/useDebounce';
import useCheckedOutSide from 'hooks/useCheckedOutSide';
import { userIdState } from 'atom/user';

import Button from 'components/common/Button';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

export default function ValidateUser() {
  const setUserId = useSetRecoilState(userIdState);
  const navigate = useNavigate();
  const [value, handleChangeValue] = useInput();
  const [validate, setValidate] = useState(false);
  const deboounceValue = useDebounce(value, 150);
  const { ref, handleChangeVisible, visible, animationState } =
    useCheckedOutSide(300);
  const handleCheckPassword = async (password: string) => {
    const { data } = await axios.post('/auth/checkpassword', {
      password,
    });
    return data;
  };

  const handleDeleteUser = () => {
    deleteUser().then(() => {
      setUserId('');
      localStorage.removeItem('auth');
      navigate('/');
    });
  };

  useEffect(() => {
    handleCheckPassword(deboounceValue).then((res) => setValidate(res));
  }, [deboounceValue]);

  return (
    <ValidateUserWrapper>
      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        value={value}
        onChange={handleChangeValue}
      />
      <Button
        onClick={handleChangeVisible}
        disable={!validate}
        type="button"
        color="black"
        size="large"
      >
        회원 탈퇴
      </Button>
      {visible && (
        <Portal>
          <Modal
            refElement={ref}
            message="정말 탈퇴하시겠습니까? 😰"
            visible={animationState}
          >
            <Button
              onClick={handleChangeVisible}
              type="button"
              color="gray100"
              size="fullWidth"
            >
              아니요
            </Button>
            <Button
              onClick={handleDeleteUser}
              type="button"
              color="black"
              size="fullWidth"
            >
              네
            </Button>
          </Modal>
        </Portal>
      )}
    </ValidateUserWrapper>
  );
}

const ValidateUserWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    margin-top: 5em;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
  button {
    margin-top: 5em;
  }

  input,
  button {
    border-radius: ${({ theme }) => theme.config.border};
    height: 40px;
    padding: 0 1em;
    width: 350px;
  }
`;
