import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { userIdState } from 'atom/atom';
import { unregister, checkPassword } from 'services/user';
import useOutsideClick from 'hooks/useOutsideClick';
import useInputTes from 'hooks/useInputTes';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

export default function Unregister() {
  const setUserId = useSetRecoilState(userIdState);
  const {
    value: password,
    error,
    setError,
    handleChange,
    handleBlur,
    ref: inputRef,
  } = useInputTes('password');

  const { ref, changeVisibility, isVisible, animationState } =
    useOutsideClick(300);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!password) {
        setError('필수 입력 항목입니다.');
        return inputRef.current?.focus();
      }
      if (error) return;
      const { success, message } = await checkPassword({ password });
      if (!success) {
        setError(message);
        return inputRef.current?.focus();
      }
      changeVisibility();
    } catch (err) {
      setError('유저 정보 확인 실패');
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
        setError('회원탈퇴 실패');
      });
  };

  return (
    <UnregisterWrapper>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          errorMessage={error}
          onBlur={handleBlur}
          type="password"
          placeholder="비밀번호"
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
