import { useRef } from 'react';

export default function useDebounce<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
) {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...args: T) => {
    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
