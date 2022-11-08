import { useEffect, useState, useRef } from 'react';

export default function useCheckedOutSide() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutSide = (e: React.MouseEvent<HTMLDivElement> | Event) => {
    const target = e.target as HTMLDivElement;
    if (visible && !ref.current?.contains(target)) setVisible(false);
  };

  const handleChangeVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (visible) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return { ref, visible, handleChangeVisible };
}
