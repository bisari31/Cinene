import { forwardRef, ForwardedRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { ColorsKey } from 'styles/theme';
import { outside } from 'styles/css';
import { useEscapeClose, usePreventScrolling } from 'hooks';

import Button from './Button';

interface Props {
  isVisible: boolean;
  buttonText: string[];
  color: ColorsKey;
  height?: string;
  children: React.ReactNode;

  closeFn?: () => void;
  executeFn: () => void;
}

function Modal(
  { children, isVisible, color, buttonText, height, closeFn, executeFn }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { scrollY } = window;

  usePreventScrolling(isVisible);
  useEscapeClose(isVisible, closeFn || executeFn);

  return (
    <StyledWrapper height={scrollY}>
      <StyledModal isVisible={isVisible} ref={ref} height={height}>
        <StyledMessage>{children}</StyledMessage>
        <StyledButtonWrapper>
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
        </StyledButtonWrapper>
      </StyledModal>
    </StyledWrapper>
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

const StyledWrapper = styled.div<{ height: number | undefined }>`
  ${outside};
  z-index: 3;
`;
const StyledModal = styled.div<{ isVisible: boolean; height?: string }>`
  animation: ${({ isVisible }) => (isVisible ? slideFadeIn : slideFadeOut)} 0.5s
    ease-out;
  background-color: ${({ theme }) => theme.colors.navy};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || '30vh'};
  margin: 3em;
  padding: 0.5rem;
  padding: 2rem;
  width: 450px;
`;
const StyledMessage = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 1.2rem;
  font-weight: 500;
  justify-content: center;
  line-height: 1.5;
  text-align: center;
`;

const StyledButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  button + button {
    margin-left: 3em;
  }
`;
