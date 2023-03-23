import { useEffect } from 'react';

export default function usePreventScrolling(isVisible: boolean) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);
}
