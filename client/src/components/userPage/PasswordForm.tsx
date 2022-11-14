import { useState, useEffect } from 'react';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import { queryClient } from 'index';

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { changePassword } from 'services/auth';
import styled from 'styled-components';
import axios from 'axios';
import CustomModal from 'components/common/Portal';
import useCheckedOutSide from 'hooks/useCheckedOutSide';

export default function PasswordForm() {
  const [disable, setDisable] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [newPaswordError, setNewPasswordError] = useState('');
  const [currentPassword, changeCurrentPassword] = useInput();
  const [newPassword, changeNewPassword] = useInput();
  const [confirmPassword, changeConfirmPassword] = useInput();
  const { ref, isVisible, changeVisible, animationState } = useCheckedOutSide();
  const navigate = useNavigate();
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      changeVisible();
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
    const body = { currentPassword, newPassword };
    mutate(body);
  };

  const handleBlur = () => {
    if (newPassword !== confirmPassword) {
      setNewPasswordError('비밀번호가 다릅니다.');
    } else {
      setNewPasswordError('');
    }
  };

  useEffect(() => {
    if (confirmPassword && newPassword && !newPaswordError) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    confirmPassword,
    currentPassword,
    newPassword,
    newPaswordError,
    passwordError,
  ]);

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
        <Input
          label="변경 비밀번호"
          type="password"
          value={newPassword}
          errorMessage={newPaswordError}
          onChange={changeNewPassword}
          onBlur={handleBlur}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={changeConfirmPassword}
          errorMessage={newPaswordError}
          onBlur={handleBlur}
        />
        <Button disable={disable} color="black" size="fullWidth" type="submit">
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
  display: flex;
  justify-content: center;
  form {
    width: 350px;
    Button {
      margin-top: 8em;
    }
  }
`;
