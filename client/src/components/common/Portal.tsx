import { RefObject } from 'react';
import ReactDOM from 'react-dom';
import { ColorsKey } from 'styles/theme';
import Modal from './Modal';

interface PorTalProps {
  children: React.ReactNode;
}

// export interface IModalProps extends PorTalProps {
//   refElement: RefObject<HTMLDivElement>;
//   isVisible: boolean;
//   buttonText: string[];
//   color: ColorsKey;
//   closeFn?: () => void;
//   executeFn: () => void;
// }

export default function Portal({ children }: PorTalProps) {
  const modal = document.getElementById('portal') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}

// export default function Portal({
//   children,
//   isVisible,
//   refElement,
//   buttonText,
//   color,
//   closeFn,
//   executeFn,
// }: IModalProps) {
//   return (
//     <div>
//       {/* <Modal
//         closeFn={closeFn}
//         color={color}
//         buttonText={buttonText}
//         isVisible={isVisible}
//         refElement={refElement}
//         executeFn={executeFn}
//       > */}
//         {children}
//       {/* </Modal> */}
//     </div>
//   );
// }
