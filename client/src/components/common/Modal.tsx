import styled, { keyframes } from 'styled-components';

interface IProps {
  message: string;
  refElement: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  visible: boolean;
}

export default function Modal({
  message,
  refElement,
  children,
  visible,
}: IProps) {
  return (
    <OutSide>
      <ModalWrapper visible={visible} ref={refElement}>
        <MessageWrapper>
          <p>{message}</p>
        </MessageWrapper>
        <BtnWrapper>{children}</BtnWrapper>
      </ModalWrapper>
    </OutSide>
  );
}
const slideFadeIn = keyframes`
from {
  transform: translateY(-100px);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
`;
const slideFadeOut = keyframes`
0% {
  transform: translateY(0);
  opacity: 1;
}
35% {
  transform: translateY(50px);
  opacity: 0.8;
}
50% {
  transform: translateY(-100px);
  opacity: 0;
}
100% {
  opacity: 0;
}
`;

const OutSide = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;
const ModalWrapper = styled.div<{ visible: boolean }>`
  animation: ${({ visible }) => (visible ? slideFadeIn : slideFadeOut)} 0.5s
    ease-out;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  height: 30vh;
  margin: 3em;
  padding: 2em;
  width: 450px;
`;
const MessageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  p {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
`;

const BtnWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 0.3em;
  button + button {
    margin-left: 3em;
  }
`;
