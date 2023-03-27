import { RefObject, useCallback } from 'react';

export default function useResizeHeight<T extends HTMLElement>(
  ref: RefObject<T>,
) {
  const reset = useCallback(() => {
    if (ref.current) ref.current.style.height = 'auto';
  }, [ref]);
  const setScroll = useCallback(() => {
    if (ref.current) ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [ref]);

  return { reset, setScroll };
}
