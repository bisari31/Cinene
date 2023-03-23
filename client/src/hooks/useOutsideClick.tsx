import { useEffect, useState, useRef, useCallback } from 'react';

export default function useOutsideClick(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMotionVisible, setIsMotionVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleModal = useCallback(() => {
    if (isVisible) {
      setIsMotionVisible(false);
      setTimeout(() => {
        setIsVisible(false);
      }, delay);
    } else {
      setIsMotionVisible(true);
      setIsVisible(true);
    }
  }, [delay, isVisible]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (isVisible && !ref.current?.contains(target)) toggleModal();
    };

    if (isVisible) document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [toggleModal, isVisible]);

  return {
    ref,
    isVisible,
    toggleModal,
    isMotionVisible,
  };
}
