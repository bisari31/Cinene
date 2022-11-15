import React, { useEffect, useState, useRef } from 'react';

export default function useClickedOutSide(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutSide = (e: React.MouseEvent<HTMLDivElement> | Event) => {
    const target = e.target as HTMLDivElement;
    if (isVisible && !ref.current?.contains(target)) changeVisible();
  };

  const changeVisible = () => {
    if (isVisible) {
      setAnimationState(false);
      setTimeout(() => {
        setIsVisible(false);
      }, delay);
    } else {
      setAnimationState(true);
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (isVisible) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return { ref, isVisible, changeVisible, animationState };
}
