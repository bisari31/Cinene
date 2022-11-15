import { useState, useEffect } from 'react';
import axios from 'axios';
import { queryClient } from 'index';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { changePassword } from 'services/auth';
import useClickedOutSide from 'hooks/useClickedOutSide';
import useInput from 'hooks/useInput';

import CustomModal from 'components/common/Portal';
import Button from 'components/common/Button';
import Input from 'components/common/Input';

export default function PasswordForm() {
  const [disable, setDisable] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [newPaswordError, setNewPasswordError] = useState('');
  const [currentPassword, changeCurrentPassword] = useInput();
  const [newPassword, changeNewPassword] = useInput();
  const [confirmPassword, changeConfirmPassword] = useInput();
  const { ref, isVisible, changeVisible, animationState } = useClickedOutSide();
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
    const body = { password: currentPassword, newPassword };
    mutate(body);
  };

  const handleBlur = () => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setNewPasswordError('비밀번호가 다릅니다.');
    } else {
      setNewPasswordError('');
    }
  };

  useEffect(() => {
    if (currentPassword && confirmPassword && newPassword && !newPaswordError) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [confirmPassword, newPassword, newPaswordError, currentPassword]);

  useEffect(() => {
    setPasswordError('');
  }, [currentPassword]);

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
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;

  Button {
    margin-top: 8em;
  }
`;
