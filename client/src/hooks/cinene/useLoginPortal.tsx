import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import useOutsideClick from '../useOutsideClick';

export default function useLoginPortal() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { isMotionVisible, toggleModal, isVisible, ref } = useOutsideClick(300);

  const openModal = (msg?: string) => {
    if (msg) setMessage(msg);
    else setMessage('');
    toggleModal();
  };

  const renderPortal = () =>
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

  return { openModal, renderPortal };
}
