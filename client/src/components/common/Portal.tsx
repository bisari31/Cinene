import { RefObject } from 'react';
import ReactDOM from 'react-dom';
import { ColorsKey } from 'styles/theme';
import Modal from './Modal';

interface PorTalProps {
  children: React.ReactNode;
}

export interface IModalProps extends PorTalProps {
  refElement: RefObject<HTMLDivElement>;
  visible: boolean;
  buttonText: string[];
  color: ColorsKey;
  closeFn: () => void;
  executeFn?: () => void;
}

function Portal({ children }: PorTalProps) {
  const modal = document.getElementById('portal') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}

export default function CustomModal({
  children,
  visible,
  refElement,
  buttonText,
  color,
  closeFn,
  executeFn,
}: IModalProps) {
  return (
    <Portal>
      <Modal
        closeFn={closeFn}
        color={color}
        buttonText={buttonText}
        visible={visible}
        refElement={refElement}
        executeFn={executeFn}
      >
        {children}
      </Modal>
    </Portal>
  );
}
