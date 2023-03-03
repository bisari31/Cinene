import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOutsideClick } from 'hooks';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';

export default function withLoginPortal<T, U = unknown>(
  Component: React.ComponentType<{
    toggleLoginModal: () => void;
  }>,
) {
  function WithLoginPortal(props: T, ref: React.ForwardedRef<U>) {
    const navigate = useNavigate();
    const {
      animationState,
      changeVisibility,
      isVisible,
      ref: modalRef,
    } = useOutsideClick(300);
    return (
      <>
        <Component toggleLoginModal={changeVisibility} ref={ref} {...props} />
        {isVisible && (
          <Portal>
            <Modal
              executeFn={() => navigate('/login')}
              closeFn={changeVisibility}
              ref={modalRef}
              buttonText={['닫기', '로그인']}
              isVisible={animationState}
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
