import { useEffect } from 'react';

export default function useDarkOutside(isVisible: boolean) {
  useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);
}
