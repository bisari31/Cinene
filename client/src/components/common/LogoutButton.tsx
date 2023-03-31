import { useOutsideClick } from 'hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { logout } from 'services/user';
import { buttonEffect } from 'styles/css';
import { useAuth } from 'hooks/cinene';
import { KAKAO_LOGOUT_URI } from 'utils/urls';

import Modal from './Modal';
import Portal from './Portal';

export default function LogoutButton() {
  const { auth, setAuth } = useAuth();
  const { ref, isVisible, isMotionVisible, toggleModal } = useOutsideClick(300);
  const navigate = useNavigate();

  const handleLogout = async () => {
    toggleModal();
    if (auth?.kakao_id) window.location.href = KAKAO_LOGOUT_URI;
    await logout();
    localStorage.removeItem('accessToken');
    setAuth(null);
    navigate('/login');
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
