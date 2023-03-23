import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOutsideClick } from 'hooks';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';

export interface LoginPortalProps {
  openModal: (message?: string) => void;
}

export default function withLoginPortal<T, U = unknown>(
  Component: React.ComponentType<T & LoginPortalProps>,
) {
  function WithLoginPortal(props: T, ref: React.ForwardedRef<U>) {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const {
      isMotionVisible,
      toggleModal,
      isVisible,
      ref: modalRef,
    } = useOutsideClick(300);

    const openModal = (message?: string) => {
      if (message) setErrorMessage(message);
      else setErrorMessage('');
      toggleModal();
    };
    return (
      <>
        <Component openModal={openModal} {...props} ref={ref} />
        {isVisible && (
          <Portal>
            <Modal
              executeFn={errorMessage ? toggleModal : () => navigate('/login')}
              closeFn={toggleModal}
              ref={modalRef}
              buttonText={errorMessage ? ['확인'] : ['닫기', '로그인']}
              isVisible={isMotionVisible}
              color="pink"
            >
              {errorMessage ? `${errorMessage} 😭` : '로그인이 필요합니다 😎'}
            </Modal>
          </Portal>
        )}
      </>
    );
  }
  return forwardRef(WithLoginPortal);
}
