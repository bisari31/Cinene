import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { unregister, checkPassword } from 'services/user';
import useOutsideClick from 'hooks/useOutsideClick';
import { userIdState } from 'atom/atom';
import useInputTes from 'hooks/useInputTes';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

export default function Unregister() {
  const setUserId = useSetRecoilState(userIdState);
  const [password, errorMessage, setIsError, handleChange, handleBlur] =
    useInputTes('password');

  const { ref, changeVisibility, isVisible, animationState } =
    useOutsideClick(300);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsError(false);
      if (!password) return setIsError(true);
      await checkPassword({ password });
      changeVisibility();
    } catch (err) {
      setIsError(true);
    }
  };

  const handleUnregister = () => {
    unregister()
      .then(() => {
        setUserId('');
        localStorage.removeItem('auth');
        navigate('/');
      })
      .catch(() => {
        changeVisibility();
        setIsError(true);
      });
  };

  return (
    <UnregisterWrapper>
      <form onSubmit={handleSubmit}>
        <Input
          onBlur={handleBlur}
          errorMessage={errorMessage}
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={handleChange}
        />
        <Button type="submit" color="pink" size="fullWidth">
          회원 탈퇴
        </Button>
      </form>
      {isVisible && (
        <Portal>
          <Modal
            ref={ref}
            isVisible={animationState}
            buttonText={['아니요', '네']}
            closeFn={changeVisibility}
            executeFn={handleUnregister}
            color="pink"
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
  margin-top: 5em;
  form {
    width: 100%;
  }
  button {
    margin-top: 4em;
  }
`;
