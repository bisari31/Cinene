import { authUserState } from 'atom/atom';
import { useOutsideClick } from 'hooks';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { logout } from 'services/user';
import { buttonEffect } from 'styles/css';

import Modal from './Modal';
import Portal from './Portal';

export default function LogoutButton() {
  const setAuthUser = useSetRecoilState(authUserState);
  const { ref, isVisible, isMotionVisible, toggleModal } = useOutsideClick(300);

  const handleLogout = async () => {
    toggleModal();
    try {
      await logout();
    } finally {
      localStorage.removeItem('accessToken');
      setAuthUser(null);
    }
  };

  return (
    <>
      <StyledButton color="pink" type="button" onClick={toggleModal}>
        로그아웃
      </StyledButton>
      {isVisible && (
        <Portal>
          <Modal
            color="pink"
            buttonText={['아니요', '로그아웃']}
            isVisible={isMotionVisible}
            ref={ref}
            closeFn={toggleModal}
            executeFn={handleLogout}
          >
            정말 로그아웃 하시겠습니까? 😰
          </Modal>
        </Portal>
      )}
    </>
  );
}

const StyledButton = styled.button`
  ${buttonEffect}
  background-color: ${({ theme }) => theme.colors.pink};
`;
