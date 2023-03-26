import { useRef } from 'react';

export default function useDebounce<T>(cb: (event: T) => void, delay: number) {
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  return (event: T) => {
    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      cb(event);
    }, delay);
  };
}
