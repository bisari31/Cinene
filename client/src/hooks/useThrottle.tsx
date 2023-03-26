import { useRef } from 'react';

export default function useThrottle<T>(cb: (event: T) => void, delay: number) {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>();

  return (event: T) => {
    if (timerId.current) return;
    timerId.current = setTimeout(() => {
      cb(event);
      timerId.current = null;
    }, delay);
  };
}
