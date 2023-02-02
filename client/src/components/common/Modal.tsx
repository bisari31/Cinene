import { useState, useEffect, forwardRef, ForwardedRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { ColorsKey } from 'styles/theme';
import { outside } from 'styles/css';
import usePreventScrolling from 'hooks/usePreventScrolling';

import Button from './Button';

interface Props {
  isVisible: boolean;
  buttonText: string[];
  color: ColorsKey;
  children: React.ReactNode;
  closeFn?: () => void;
  executeFn: () => void;
}

function Modal(
  { children, isVisible, color, buttonText, closeFn, executeFn }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [height, setHeight] = useState<number>();

  usePreventScrolling(isVisible);

  useEffect(() => {
    setHeight(window.scrollY);
  }, [isVisible]);
  return (
    <OutSide height={height}>
      <ModalWrapper isVisible={isVisible} ref={ref}>
        <MessageWrapper>
          <p>{children}</p>
        </MessageWrapper>
        <BtnWrapper>
          <Button
            type="button"
            size="fullWidth"
            color={buttonText.length === 2 ? 'navy50' : color}
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

export default forwardRef(Modal);

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

const OutSide = styled.div<{ height: number | undefined }>`
  ${outside};
  z-index: 3;
`;
const ModalWrapper = styled.div<{ isVisible: boolean }>`
  animation: ${({ isVisible }) => (isVisible ? slideFadeIn : slideFadeOut)} 0.5s
    ease-out;
  background-color: ${({ theme }) => theme.colors.navy};
  border-radius: 30px;
  display: flex;
  /* box-shadow: 0px 4px 14px 3px rgba(0, 0, 0, 0.6); */
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
