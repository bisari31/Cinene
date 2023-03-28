import { RefObject, useCallback } from 'react';

export default function useFocus(
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement>,
) {
  const start = useCallback(() => {
    if (ref.current) ref.current.focus();
  }, [ref]);

  const end = useCallback(() => {
    if (ref.current) {
      ref.current.setSelectionRange(
        ref.current.value.length,
        ref.current.value.length,
      );
      ref.current.focus();
    }
  }, [ref]);

  return { start, end };
}
