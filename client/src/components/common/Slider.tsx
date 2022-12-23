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
  const [isDragging, setIsDragging] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  const ref = useRef<HTMLUListElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    ref.current.style.transition = '';
    setIsDown(true);
    setStartX(e.pageX);
    const x = getTranslateX(ref.current);
    setEndX(x);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;
    setIsDragging(true);
    setCurrentX(e.pageX - startX + endX);
    if (currentX > 0) return setCurrentX((prev) => prev / 2);
    if (maxWidth > currentX)
      setCurrentX((prev) => (prev - maxWidth) / 2 + maxWidth);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setTranslateX(e.pageX, ref.current);
    setIsDown(false);
    getTransition(ref.current);
    setIsDragging(false);
  };

  const getTransition = (element: HTMLElement) => {
    element.style.transition = '0.5s ease';
  };

  const getTranslateX = (element: HTMLElement) => {
    const style = getComputedStyle(element).getPropertyValue('transform');
    const array = style.split(',');
    return Number(array[4]);
  };

  const setTranslateX = (pageX: number, element: HTMLElement) => {
    if (startX > pageX) {
      nextSlide(element);
    } else {
      prevSlide();
    }
  };

  const nextSlide = (element: HTMLElement | null) => {
    if (element) {
      const nextWidth = currentX - clientWidth * PERCENT;
      setCurrentX(nextWidth < maxWidth ? maxWidth : nextWidth);
    }
  };

  const prevSlide = () => {
    const nextWidth = currentX + clientWidth * PERCENT;
    setCurrentX(nextWidth > 0 ? 0 : nextWidth);
  };

  const getWidth = useCallback(() => {
    if (ref.current) {
      setClientWidth(ref.current.clientWidth);
      setMaxWidth(ref.current.clientWidth - ref.current.scrollWidth);
    }
  }, []);

  const getThrottleWidth = throttle(getWidth, 1000);

  useEffect(() => {
    const checkOutSideClick = (element: HTMLElement | null) => {
      if (!element) return;
      getTransition(element);
      if (currentX > 0) return setCurrentX(0);
      if (currentX < maxWidth) setCurrentX(maxWidth);
    };

    if (!isDown) checkOutSideClick(ref.current);
  }, [currentX, isDown, maxWidth, ref]);

  useEffect(() => {
    getWidth();
  }, [ref, children, getWidth]);

  useEffect(() => {
    if (ref.current) ref.current.style.transform = `translateX(${currentX}px)`;
  }, [currentX, ref]);

  useEffect(() => {
    window.addEventListener('resize', getThrottleWidth);
    return () => window.removeEventListener('reize', getThrottleWidth);
  });

  return (
    <SliderWrapper disable={isDragging}>
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
      {maxWidth ? (
        <ButtonWrapper>
          <button type="button" onClick={prevSlide}>
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => nextSlide(ref.current)}>
            <ChevronRight />
          </button>
        </ButtonWrapper>
      ) : (
        ''
      )}
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div<{ disable: boolean }>`
  ${({ disable }) => css`
    margin-bottom: 4rem;
    overflow: hidden;
    position: relative;
    h3 {
      font-size: 1rem;
      height: 30px;
      font-weight: 500;
      line-height: 30px;
      margin-bottom: 1.5rem;
    }
    ul {
      display: flex;
    }
    img {
      pointer-events: ${disable ? 'none' : 'auto'};
    }
  `}
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
