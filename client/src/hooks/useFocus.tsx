import { useEffect, RefObject } from 'react';

export default function useFocus<T extends HTMLElement>(ref: RefObject<T>) {
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);
}
