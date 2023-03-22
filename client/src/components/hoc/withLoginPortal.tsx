import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOutsideClick } from 'hooks';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';

export interface LoginPortalProps {
  toggleLoginModal: () => void;
}

export default function withLoginPortal<T, U = unknown>(
  Component: React.ComponentType<T & LoginPortalProps>,
) {
  function WithLoginPortal(props: T, ref: React.ForwardedRef<U>) {
    const navigate = useNavigate();
    const {
      isMotionVisible,
      toggleModal,
      isVisible,
      ref: modalRef,
    } = useOutsideClick(300);
    return (
      <>
        <Component toggleLoginModal={toggleModal} {...props} ref={ref} />
        {isVisible && (
          <Portal>
            <Modal
              executeFn={() => navigate('/login')}
              closeFn={toggleModal}
              ref={modalRef}
              buttonText={['닫기', '로그인']}
              isVisible={isMotionVisible}
              color="pink"
            >
              로그인이 필요합니다 😎
            </Modal>
          </Portal>
        )}
      </>
    );
  }
  return forwardRef(WithLoginPortal);
}
