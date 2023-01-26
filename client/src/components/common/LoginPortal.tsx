import { useNavigate } from 'react-router-dom';

import Modal from './Modal';
import Portal from './Portal';

interface IProps {
  closeFn: () => void;
  isVisible: boolean;
  refElement: React.RefObject<HTMLDivElement>;
}

export default function LoginPortal({
  closeFn,
  isVisible,
  refElement,
}: IProps) {
  const navigate = useNavigate();

  return (
    <Portal>
      <Modal
        executeFn={() => navigate('/login')}
        closeFn={closeFn}
        refElement={refElement}
        buttonText={['닫기', '로그인']}
        isVisible={isVisible}
        color="pink"
      >
        로그인이 필요합니다 😎
      </Modal>
    </Portal>
  );
}
