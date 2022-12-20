import React, { useState, useRef, useEffect, useCallback } from 'react';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

import { ChevronLeft, ChevronRight } from 'assets';
import throttle from 'hooks/useThrottle';

interface Props {
  children: React.ReactNode;
  title: string;
}

const PERCENT = 0.5;

export default function Slider({ children, title }: Props) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  const ref = useRef<HTMLUListElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    ref.current.style.transition = '';
    setIsDown(true);
    setStartX(e.pageX);
    const b = getTranslateX(ref.current);
    setEndX(b);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    setCurrentX(e.pageX - startX + endX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setTranslateX(e.pageX, ref.current);
    setIsDown(false);
    ref.current.style.transition = '0.5s ease';
  };

  const getTranslateX = (element: HTMLElement) => {
    const style = getComputedStyle(element).getPropertyValue('transform');
    const array = style.split(',');
    return Number(array[4]);
  };

  const setTranslateX = (pageX: number, element: HTMLElement) => {
    if (startX > pageX) {
      const nextWidth = currentX - clientWidth * PERCENT;
      const max = element.clientWidth - element.scrollWidth;
      setCurrentX(nextWidth < max ? max : nextWidth);
    } else {
      const nextWidth = currentX + clientWidth * PERCENT;
      setCurrentX(nextWidth > 0 ? 0 : nextWidth);
    }
  };

  useEffect(() => {
    if (ref.current) {
      setClientWidth(ref.current.clientWidth);
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateX(${currentX}px)`;
    }
  }, [currentX]);

  return (
    <SliderWrapper>
      <h3>{title}</h3>
      <ul
        ref={ref}
        onMouseLeave={() => setIsDown(false)}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        role="presentation"
      >
        {children}
      </ul>
      <ButtonWrapper>
        <button type="button">
          <ChevronLeft />
        </button>
        <button type="button">
          <ChevronRight />
        </button>
      </ButtonWrapper>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  margin-bottom: 3rem;
  overflow: hidden;
  position: relative;
  h3 {
    font-size: 1rem;
    height: 30px;
    line-height: 30px;
    margin-bottom: 1.5rem;
  }
  ul {
    display: flex;
  }
  img {
    pointer-events: none;
  }
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 0;
    top: 0;
    button + button {
      margin-left: 1em;
    }
    button {
      background: ${theme.colors.navy50};
      border: none;
      border-radius: 10px;
      height: 30px;
      &:hover {
        background: ${lighten(0.1, theme.colors.navy50)};
      }
      &:active {
        background: ${darken(0.1, theme.colors.navy50)};
      }
      svg {
        align-items: center;
        display: flex;
        height: 1.5rem;
        justify-content: center;
        stroke: ${theme.colors.gray300};
        width: 1.5rem;
      }
    }
  `}
`;
