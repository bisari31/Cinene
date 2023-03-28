import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { unregister } from 'services/user';
import { useOutsideClick } from 'hooks';
import { useAuth, useLoginPortal } from 'hooks/cinene';

import Button from 'components/common/Button';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

export default function Unregister() {
  const { setAuth } = useAuth();
  const { openPortal, renderPortal } = useLoginPortal();
  const { ref, toggleModal, isVisible, isMotionVisible } = useOutsideClick(300);
  const navigate = useNavigate();

  const handleUnregister = () => {
    unregister()
      .then(() => {
        setAuth(null);
        localStorage.removeItem('accessToken');
        navigate('/');
      })
      .catch((err: AxiosError) => {
        if (err.response.status === 401) {
          setAuth(null);
          openPortal();
        } else {
          openPortal(`${err.response.data.message} 😭`);
        }
      });
  };

  return (
    <StyledWrapper>
      <Button type="submit" color="pink" size="fullWidth" onClick={toggleModal}>
        회원 탈퇴
      </Button>
      {isVisible && (
        <Portal>
          <Modal
            ref={ref}
            isVisible={isMotionVisible}
            buttonText={['아니요', '네']}
            closeFn={toggleModal}
            executeFn={handleUnregister}
            color="pink"
          >
            정말 탈퇴하시겠습니까? 😭
          </Modal>
        </Portal>
      )}
      {renderPortal()}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;

  button {
    margin-top: 4em;
    max-width: 400px;
  }
`;
