import { useEffect, useState, useRef } from 'react';

export default function useCheckedOutSide(delay = 0) {
  const [visible, setVisible] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutSide = (e: React.MouseEvent<HTMLDivElement> | Event) => {
    const target = e.target as HTMLDivElement;
    if (visible && !ref.current?.contains(target)) handleChangeVisible();
  };

  const handleChangeVisible = () => {
    if (visible) {
      setAnimationState(false);
      setTimeout(() => {
        setVisible(false);
      }, delay);
    } else {
      setAnimationState(true);
      setVisible(true);
    }
  };

  useEffect(() => {
    if (visible) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return { ref, visible, handleChangeVisible, animationState };
}
