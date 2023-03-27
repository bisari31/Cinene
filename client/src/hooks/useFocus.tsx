import { RefObject, useCallback } from 'react';

export default function useFocus<T>(ref: RefObject<T>) {
  const start = useCallback(() => {
    if (ref.current && ref.current instanceof HTMLElement) ref.current.focus();
  }, [ref]);

  const end = useCallback(() => {
    if (
      ref.current &&
      (ref.current instanceof HTMLInputElement ||
        ref.current instanceof HTMLTextAreaElement)
    ) {
      ref.current.setSelectionRange(
        ref.current.value.length,
        ref.current.value.length,
      );
      ref.current.focus();
    }
  }, [ref]);

  return { start, end };
}
