import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { changePassword } from 'services/auth';
import useOutsideClick from 'hooks/useOutsideClick';
import useInput from 'hooks/useInput';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import ConfirmPassword from 'components/common/ConfirmPassword';
import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';

export default function PasswordForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { input: currentPassword, handleChange: changeCurrentPassword } =
    useInput();

  const [newPaswordError, setNewPasswordError] = useState(true);
  const {
    input: newPassword,
    handleChange: changeNewPassword,
    errorMsg,
  } = useInput();

  const { ref, isVisible, changeVisibility, animationState } =
    useOutsideClick();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      changeVisibility();
      queryClient.invalidateQueries(['auth']);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setPasswordError(err.response?.data.message);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { password: currentPassword, newPassword };
    mutate(body);
  };

  useEffect(() => {
    setPasswordError('');
  }, [currentPassword]);

  useEffect(() => {
    if (currentPassword && !passwordError && !newPaswordError) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [currentPassword, passwordError, newPaswordError]);

  return (
    <UserModifyWrapper>
      <form action="" onSubmit={handleSubmit}>
        <Input
          label="비밀번호"
          type="password"
          value={currentPassword}
          onChange={changeCurrentPassword}
          errorMessage={passwordError}
        />
        <ConfirmPassword
          errorMessage={errorMsg}
          placeholder="영문,숫자 포함 8~16자"
          type="edit"
          password={newPassword}
          setReturnError={setNewPasswordError}
          onChange={changeNewPassword}
        />
        <Button
          isDisabled={isDisabled}
          color="pink"
          size="fullWidth"
          type="submit"
        >
          비밀번호 변경
        </Button>
      </form>
      {isVisible && (
        <Portal>
          <Modal
            ref={ref}
            isVisible={animationState}
            buttonText={['확인']}
            color="pink"
            executeFn={() => navigate('/')}
          >
            비밀번호 변경 완료
          </Modal>
        </Portal>
      )}
    </UserModifyWrapper>
  );
}

const UserModifyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;

  Button {
    margin-top: 4em;
  }
`;
