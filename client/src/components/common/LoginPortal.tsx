import { forwardRef, ForwardedRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from './Modal';
import Portal from './Portal';

interface IProps {
  closeFn: () => void;
  isVisible: boolean;
}

function LoginPortal(
  { closeFn, isVisible }: IProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const navigate = useNavigate();

  return (
    <Portal>
      <Modal
        executeFn={() => navigate('/login')}
        closeFn={closeFn}
        ref={ref}
        buttonText={['닫기', '로그인']}
        isVisible={isVisible}
        color="pink"
      >
        로그인이 필요합니다 😎
      </Modal>
    </Portal>
  );
}

export default forwardRef(LoginPortal);
