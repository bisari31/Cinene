import styled, { css } from 'styled-components';
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
import CustomPortal from 'components/common/Portal';

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
      <div>
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
          <CustomPortal
            refElement={ref}
            visible={animationState}
            buttonText={['아니요', '네']}
            closeFn={handleChangeVisible}
            executeFn={handleDeleteUser}
            color="black"
          >
            정말 탈퇴하시겠습니까? 😭
          </CustomPortal>
        )}
      </div>
    </ValidateUserWrapper>
  );
}

const ValidateUserWrapper = styled.section`
  ${({ theme }) => css`
    padding: 5em;
    & > div {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    input {
      border: 1px solid ${theme.colors.gray100};
    }
    button {
      margin-top: 5em;
    }

    input,
    button {
      border-radius: ${theme.config.border};
      height: 40px;
      padding: 0 1em;
      width: 350px;
    }
  `}
`;
