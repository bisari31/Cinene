import ReactDOM from 'react-dom';

interface IProps {
  children: React.ReactNode;
}

export default function Portal({ children }: IProps) {
  const modal = document.getElementById('portal') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}
