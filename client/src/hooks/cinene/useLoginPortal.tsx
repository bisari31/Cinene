import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import useOutsideClick from '../useOutsideClick';

export default function useLoginPortal() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { isMotionVisible, toggleModal, isVisible, ref } = useOutsideClick(300);

  const open = useCallback(
    (msg?: string) => {
      if (msg) setMessage(msg);
      else setMessage('');
      toggleModal();
    },
    [toggleModal],
  );

  const render = () =>
    isVisible && (
      <Portal>
        <Modal
          executeFn={message ? toggleModal : () => navigate('/login')}
          closeFn={toggleModal}
          ref={ref}
          buttonText={message ? ['확인'] : ['닫기', '로그인']}
          isVisible={isMotionVisible}
          color="pink"
        >
          {message || '로그인이 필요합니다 😎'}
        </Modal>
      </Portal>
    );

  return { open, render };
}
