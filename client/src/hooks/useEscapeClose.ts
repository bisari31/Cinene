import { useEffect } from 'react';

export default function useEscapeClose(
  isVisible: boolean,
  functon: () => void,
) {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') functon();
    };

    if (isVisible) document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [functon, isVisible]);
}
