import { userIdState } from 'atom/atom';
import useOutsideClick from 'hooks/useOutsideClick';
import { useSetRecoilState } from 'recoil';
import { logout } from 'services/auth';
import styled from 'styled-components';
import { buttonEffect } from 'styles/css';

import Modal from './Modal';
import Portal from './Portal';

export default function LogoutButton() {
  const setUserId = useSetRecoilState(userIdState);
  const { ref, isVisible, animationState, handleChangeVisibility } =
    useOutsideClick(300);

  const handleLogout = () => {
    handleChangeVisibility();
    logout().then(() => {
      localStorage.removeItem('userId');
      setUserId('');
    });
  };

  return (
    <>
      <Button color="pink" type="button" onClick={handleChangeVisibility}>
        로그아웃
      </Button>
      {isVisible && (
        <Portal>
          <Modal
            color="pink"
            buttonText={['아니요', '로그아웃']}
            isVisible={animationState}
            ref={ref}
            closeFn={handleChangeVisibility}
            executeFn={handleLogout}
          >
            정말 로그아웃 하시겠습니까? 😰
          </Modal>
        </Portal>
      )}
    </>
  );
}

const Button = styled.button`
  ${buttonEffect}
  background-color: ${({ theme }) => theme.colors.pink};
`;
