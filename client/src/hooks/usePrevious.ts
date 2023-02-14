import { useRef, useEffect } from 'react';

export default function usePrevious<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
    console.log(
      '🚀 ~ file: usePrevious.ts:9 ~ useEffect ~ ref.current',
      ref.current,
    );
  }, [value]);

  return ref.current;
}
