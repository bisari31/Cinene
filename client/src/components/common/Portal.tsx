import ReactDOM from 'react-dom';

interface PorTalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PorTalProps) {
  const modal = document.getElementById('portal') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}
