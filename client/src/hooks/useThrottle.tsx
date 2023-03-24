import { useRef } from 'react';

export default function useThrottle<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
) {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: T) => {
    if (timerId.current) return;
    timerId.current = setTimeout(() => {
      cb(...args);
      timerId.current = null;
    }, delay);
  };
}
