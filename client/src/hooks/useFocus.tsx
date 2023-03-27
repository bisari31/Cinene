import { RefObject, useCallback } from 'react';

export default function useFocus<T>({ current }: RefObject<T>) {
  const start = useCallback(() => {
    if (current && current instanceof HTMLElement) current.focus();
  }, [current]);

  const end = useCallback(() => {
    if (
      current &&
      (current instanceof HTMLInputElement ||
        current instanceof HTMLTextAreaElement)
    ) {
      current.setSelectionRange(current.value.length, current.value.length);
      current.focus();
    }
  }, [current]);

  return { start, end };
}
