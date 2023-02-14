import { useEffect, useState } from 'react';

export default function useDebounce(text: string, timer: number) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const executeFn = setTimeout(() => {
      setValue(text);
    }, timer);
    return () => {
      clearTimeout(executeFn);
    };
  }, [text, timer]);
  return value;
}
