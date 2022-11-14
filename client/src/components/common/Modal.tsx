import styled, { keyframes } from 'styled-components';
import Button from './Button';
import { IModalProps } from './Portal';

export default function Modal({
  refElement,
  children,
  visible,
  color,
  buttonText,
  closeFn,
  executeFn,
}: IModalProps) {
  return (
    <OutSide>
      <ModalWrapper visible={visible} ref={refElement}>
        <MessageWrapper>
          <p>{children}</p>
        </MessageWrapper>
        <BtnWrapper>
          <Button
            type="button"
            size="fullWidth"
            color={buttonText.length === 2 ? 'gray100' : color}
            onClick={buttonText.length === 2 ? closeFn : executeFn}
          >
            {buttonText[0]}
          </Button>
          {buttonText.length === 2 && (
            <Button
              type="button"
              size="fullWidth"
              color={color}
              onClick={executeFn}
            >
              {buttonText[1]}
            </Button>
          )}
        </BtnWrapper>
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
  line-height: 1.5;
  p {
    font-size: 1.2rem;
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
