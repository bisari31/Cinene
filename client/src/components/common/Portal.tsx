import { RefObject } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

interface PorTalProps {
  children: React.ReactNode;
}

interface IProps extends PorTalProps {
  message: string;
  visible: boolean;
  refElement: RefObject<HTMLDivElement>;
}

function Portal({ children }: PorTalProps) {
  const modal = document.getElementById('portal') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}

export default function CustomPortal({
  children,
  message,
  visible,
  refElement,
}: IProps) {
  return (
    <Portal>
      <Modal message={message} visible={visible} refElement={refElement}>
        {children}
      </Modal>
    </Portal>
  );
}
