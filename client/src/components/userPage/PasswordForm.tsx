import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { queryClient } from 'index';
import { changePassword } from 'services/auth';
import useClickedOutSide from 'hooks/useClickedOutSide';
import useInput from 'hooks/useInput';

import CustomModal from 'components/common/Portal';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import ConfirmPassword from 'components/common/ConfirmPassword';

export default function PasswordForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, changeCurrentPassword] = useInput();

  const [newPaswordError, setNewPasswordError] = useState(true);
  const [newPassword, changeNewPassword] = useInput();

  const { ref, isVisible, changeVisibility, animationState } =
    useClickedOutSide();
  const navigate = useNavigate();

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
          type="edit"
          password={newPassword}
          setReturnError={setNewPasswordError}
          onChange={changeNewPassword}
        />
        <Button
          isDisabled={isDisabled}
          color="black"
          size="fullWidth"
          type="submit"
        >
          비밀번호 변경
        </Button>
      </form>
      {isVisible && (
        <CustomModal
          refElement={ref}
          isVisible={animationState}
          buttonText={['확인']}
          color="black"
          executeFn={() => navigate('/')}
        >
          비밀번호 변경 완료
        </CustomModal>
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
    margin-top: 8em;
  }
`;
