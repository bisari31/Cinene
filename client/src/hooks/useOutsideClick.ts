import { useEffect, useState, useRef, useCallback } from 'react';

export default function useOutsideClick(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChangeVisibility = useCallback(() => {
    if (isVisible) {
      setAnimationState(false);
      setTimeout(() => {
        setIsVisible(false);
      }, delay);
    } else {
      setAnimationState(true);
      setIsVisible(true);
    }
  }, [delay, isVisible]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (isVisible && !ref.current?.contains(target)) handleChangeVisibility();
    };

    if (isVisible) document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleChangeVisibility, isVisible]);

  return {
    ref,
    isVisible,
    handleChangeVisibility,
    animationState,
  };
}
